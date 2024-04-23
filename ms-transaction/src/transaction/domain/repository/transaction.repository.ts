import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudTransactionRepository } from './transaction.interface';
import { TransactionEntity } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionRepository implements CrudTransactionRepository {
  private readonly logger = new Logger(TransactionRepository.name);

  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}
  findById(id: string): Promise<any> {
    try {
      return this.transactionRepository.findOne({
        where: { id },
        relations: ['tranferTypeId'],
      });
    } catch (error) {
      this.logger.error(error, 'error al consultar por id transaccion repo');
      throw error;
    }
  }

  async register(newTransaction: any): Promise<any> {
    try {
      return await this.transactionRepository.save(newTransaction);
    } catch (error) {
      this.logger.error(error, 'error al guardar transaccion repo');
      throw error;
    }
  }

  async update(id: string, dataToUpdate: object): Promise<any> {
    try {
      return await this.transactionRepository.update({ id }, dataToUpdate);
    } catch (error) {
      this.logger.error(error, 'error al actualizar transaccion repo');
      throw error;
    }
  }
}
