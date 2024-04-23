import { Module, forwardRef } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment/environment-config.module';
import { KafkaService } from './kafka.service';
import { ConsumerController } from './consumer.controller';
import { AntiFraudModule } from '../anti-fraud/anti-fraud.module';

@Module({
  controllers: [ConsumerController],
  imports: [EnvironmentConfigModule, forwardRef(() => AntiFraudModule)],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
