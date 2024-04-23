import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TransactionTypeEntity } from '../entities/transaction-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudTransactionTypeRepository } from './transaction-type.interface';

@Injectable()
export class TransactionTypeRepository
  implements CrudTransactionTypeRepository
{
  private readonly logger = new Logger(TransactionTypeRepository.name);

  constructor(
    @InjectRepository(TransactionTypeEntity)
    private transactionTypeRepository: Repository<TransactionTypeEntity>,
  ) {}
  findOne(code: number): Promise<any> {
    try {
      return this.transactionTypeRepository.findOne({
        where: { code },
      });
    } catch (error) {
      this.logger.error(error, 'error al consultar transaction type repo');
      throw error;
    }
  }
}
