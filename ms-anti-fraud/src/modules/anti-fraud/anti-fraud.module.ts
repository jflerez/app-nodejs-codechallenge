import { Module, forwardRef } from '@nestjs/common';
import { AntiFraudService } from './anti-fraud.service';
import { KafkaModule } from '../kafka/kafka.module';
import { EnvironmentConfigModule } from '../config/environment/environment-config.module';

@Module({
  imports: [forwardRef(() => KafkaModule), EnvironmentConfigModule],
  providers: [AntiFraudService],
  exports: [AntiFraudService],
})
export class AntiFraudModule {}
