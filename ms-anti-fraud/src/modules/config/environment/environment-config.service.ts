import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getBrokerKafka(): string {
    return this.configService.get<string>('KAFKA_BROKER');
  }

  getTransactionValidateTopic(): string {
    return this.configService.get<string>('KAFKA_TRANSACTION_VALIDATE_TOPIC');
  }

  getAntifraudTopic(): string {
    return this.configService.get<string>('KAFKA_ANTIFRAUD_TOPIC');
  }

  getRejectedTransactionValue(): number {
    return this.configService.get<number>('REJECTED_TRANSACTION_VALUE');
  }
}
