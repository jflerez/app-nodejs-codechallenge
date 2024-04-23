import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCaseTransaction } from './transaction-use-case.interface';
import { TransactionRepository } from '../../../domain/repository/transaction.repository';
import { CrudTransactionRepository } from '../../../domain/repository/transaction.interface';
import { InfraKafka } from '../../../infrastructure/driven-adapters/message-queues/kafka/kafka.interface';
import { KafkaService } from '../../../infrastructure/driven-adapters/message-queues/kafka/kafka.service';
import { TransactionEntity } from '../../../domain/entities/transaction.entity';
import { CreateTransactionInput } from '../../../infrastructure/api/graphql/inputs/transaction-create.input';
import { RedisService } from '../../../infrastructure/driven-adapters/redis/redis.service';
import { InfraRedis } from '../../../infrastructure/driven-adapters/redis/redis.interface';
import { transformData } from '../../../infrastructure/api/mapper';
import { UseCaseError } from '../../../infrastructure/api/errors/api.error';
import { formatResponse } from '../../../infrastructure/api/helpers/response.helper';
import { MESSAGE } from '../../../infrastructure/api/constants/message';
import { ERROR } from '../../../infrastructure/api/errors/exceptions';
import { UseCaseTransactionType } from '../transaction-type/transaction-type-use-case.interface';
import { TransactionTypeUseCaseService } from '../transaction-type/transaction-type-use-case.service';
const { TRANSACTION_NOT_FOUND, TRANSACTION_CREATE_SUCCESS } = MESSAGE;
const {
  TRANSACTION_CREATE_EXCEPTION,
  TRANSACTION_UPDATE_EXCEPTION,
  TRANSACTION_FIND_ONE_EXCEPTION,
} = ERROR;

@Injectable()
export class TransactionUseCaseService implements UseCaseTransaction {
  private readonly logger = new Logger(TransactionUseCaseService.name);

  constructor(
    @Inject(TransactionRepository)
    private readonly transactionRepository: CrudTransactionRepository,
    @Inject(KafkaService)
    private readonly kafkaService: InfraKafka,
    @Inject(RedisService)
    private readonly redisService: InfraRedis,
    @Inject(TransactionTypeUseCaseService)
    private readonly transactionTypeUseCase: UseCaseTransactionType,
  ) {}
  async findById(id: string): Promise<any> {
    try {
      let transactionRecord = await this.redisService.get(id);
      this.logger.log(`data extraida de redis: ${transactionRecord}`);

      if (!transactionRecord) {
        transactionRecord = await this.transactionRepository.findById(id);
        this.logger.log(`data extraida de la db: ${transactionRecord}`);

        if (!transactionRecord) {
          return formatResponse({ transaction: null }, TRANSACTION_NOT_FOUND);
        }
        const recordFormat = transformData(transactionRecord);
        await this.redisService.set(id, recordFormat);
        return formatResponse(recordFormat);
      }

      return formatResponse(transactionRecord);
    } catch (error) {
      this.logger.error(id, 'error al consultar transaccion en la db', error);
      throw new UseCaseError(
        TRANSACTION_FIND_ONE_EXCEPTION.message,
        TRANSACTION_FIND_ONE_EXCEPTION.code,
        { id },
        error,
      );
    }
  }

  async register(transactionCreateInput: CreateTransactionInput): Promise<any> {
    try {
      this.logger.log(`transaccion a registrar: ${transactionCreateInput}`);
      await this.transactionTypeUseCase.findOne(
        transactionCreateInput.tranferTypeId,
      );
      const transaction: TransactionEntity =
        await this.transactionRepository.register(transactionCreateInput);
      await this.kafkaService.sendMessage({
        transactionId: transaction.id,
        transactionValue: transaction.value,
      });

      return formatResponse(
        {
          transactionExternalId: transaction.id,
        },
        TRANSACTION_CREATE_SUCCESS,
      );
    } catch (error) {
      this.logger.error(
        transactionCreateInput,
        'error al guardar transaccion en la db',
        error,
      );
      throw new UseCaseError(
        `${TRANSACTION_CREATE_EXCEPTION.message}: ${error.message}`,
        TRANSACTION_CREATE_EXCEPTION.code,
        transactionCreateInput,
        error,
      );
    }
  }

  async update(id: string, dataToUpdate: object): Promise<any> {
    try {
      return await this.transactionRepository.update(id, dataToUpdate);
    } catch (error) {
      this.logger.error(
        { id, dataToUpdate },
        'error al actualizar transaccion en la db',
        error,
      );
      throw new UseCaseError(
        TRANSACTION_UPDATE_EXCEPTION.message,
        TRANSACTION_UPDATE_EXCEPTION.code,
        { id, dataToUpdate },
        error,
      );
    }
  }
}
