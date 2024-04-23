import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly config: EnvironmentConfigService) {
    this.kafka = new Kafka({
      clientId: 'anti-fraud-client',
      brokers: [this.config.getBrokerKafka()],
      connectionTimeout: 5000,
    });
    this.producer = this.kafka.producer();
  }

  async sendMessage(message: any): Promise<void> {
    console.log('Sending message transaction to Kafka');
    await this.producer.connect();
    await this.producer.send({
      topic: this.config.getAntifraudTopic(),
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
