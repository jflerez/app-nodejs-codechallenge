import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { InfraKafka } from './kafka.interface';
import { EnvironmentConfigService } from '../../../config/environment-config/environment-config.service';
import { ClientKafka } from '@nestjs/microservices/client';

@Injectable()
export class KafkaService implements InfraKafka {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private configService: EnvironmentConfigService) {
    this.kafka = new Kafka({
      clientId: 'transaction-client',
      brokers: [this.configService.getBrokerKafka()],
      connectionTimeout: 5000,
    });
    this.producer = this.kafka.producer();
  }

  async sendMessage(message: string): Promise<void> {
    console.log('Sending message to Kafka');
    await this.producer.connect();
    await this.producer.send({
      topic: this.configService.getTransactionTopic(),
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
