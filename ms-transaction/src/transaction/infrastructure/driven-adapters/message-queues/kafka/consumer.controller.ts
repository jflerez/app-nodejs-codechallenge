import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UseCaseTransaction } from '../../../../application/usecases/transaction/transaction-use-case.interface';
import { TransactionUseCaseService } from '../../../../application/usecases/transaction/transaction-use-case.service';
import { updateTransacionAntiFraud } from '../../../../domain/interface/transaction.interface';

@Controller()
export class ConsumerController {
  constructor(
    @Inject(TransactionUseCaseService)
    private readonly _transactionService: UseCaseTransaction,
  ) {}

  @MessagePattern('antifraud-validate')
  async getResultAntiFraud(
    @Payload() message: updateTransacionAntiFraud,
  ): Promise<void> {
    console.log('Message received antifraude', message);
    await this._transactionService.update(message.transactionId, {
      status: message.transactionStatus,
    });
  }
}
