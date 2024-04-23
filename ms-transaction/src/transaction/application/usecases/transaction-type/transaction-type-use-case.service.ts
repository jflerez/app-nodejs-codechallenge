import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCaseError } from '../../../infrastructure/api/errors/api.error';
import { ERROR } from '../../../infrastructure/api/errors/exceptions';
import { TransactionTypeRepository } from '../../../../transaction/domain/repository/transaction-type.repository';
import { UseCaseTransactionType } from './transaction-type-use-case.interface';
import { CrudTransactionTypeRepository } from '../../../../transaction/domain/repository/transaction-type.interface';
const { TRANSACTION_TYPE_EXCEPTION } = ERROR;

@Injectable()
export class TransactionTypeUseCaseService implements UseCaseTransactionType {
  private readonly logger = new Logger(TransactionTypeUseCaseService.name);

  constructor(
    @Inject(TransactionTypeRepository)
    private readonly transactionTypeRepository: CrudTransactionTypeRepository,
  ) {}
  async findOne(code: number): Promise<any> {
    try {
      this.logger.log(`codigo a validar ${code}`);
      const transactionType = await this.transactionTypeRepository.findOne(
        code,
      );

      if (!transactionType) {
        throw new UseCaseError(
          TRANSACTION_TYPE_EXCEPTION.message,
          TRANSACTION_TYPE_EXCEPTION.code,
          code,
        );
      }
      return transactionType;
    } catch (error) {
      throw error;
    }
  }
}
