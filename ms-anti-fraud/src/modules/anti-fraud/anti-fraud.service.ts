import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { TransactionValidate } from '../../interface';
import { STATUS_TRANSACTION } from '../../common/enum';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';

@Injectable()
export class AntiFraudService {
  constructor(
    private kafkaService: KafkaService,
    private config: EnvironmentConfigService,
  ) {}
  async validateTransation({
    transactionId,
    transactionValue,
  }: TransactionValidate): Promise<void> {
    console.log('valor a validar ', this.config.getRejectedTransactionValue());
    const transactionStatus =
      transactionValue > this.config.getRejectedTransactionValue()
        ? STATUS_TRANSACTION.REJECTED
        : STATUS_TRANSACTION.APPROVED;

    await this.kafkaService.sendMessage({ transactionId, transactionStatus });
  }
}
