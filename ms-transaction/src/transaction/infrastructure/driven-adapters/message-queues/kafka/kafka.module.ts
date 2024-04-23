import { Module, forwardRef } from '@nestjs/common';
import { KafkaService } from './kafka.service';

import { EnvironmentConfigModule } from '../../../config/environment-config/environment-config.module';
import { Partitioners } from 'kafkajs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerController } from './consumer.controller';
import { TransactionModule } from '../../../../transaction.module';

@Module({
  imports: [EnvironmentConfigModule, forwardRef(() => TransactionModule)],
  providers: [KafkaService],
  controllers: [ConsumerController],
  exports: [KafkaService],
})
export class KafkaModule {}
