import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('POSTGRES_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getBrokerKafka(): string {
    return this.configService.get<string>('KAFKA_BROKER');
  }

  getTransactionTopic(): string {
    return this.configService.get<string>('KAFKA_TRANSACTION_TOPIC');
  }

  getAntifraudTopic(): string {
    return this.configService.get<string>('KAFKA_ANTIFRAUD_TOPIC');
  }

  getAppPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  getRedisTTL(): number {
    return this.configService.get<number>('REDIS_TTL');
  }
}
