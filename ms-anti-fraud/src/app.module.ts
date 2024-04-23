import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from './modules/config/environment/environment-config.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AntiFraudModule } from './modules/anti-fraud/anti-fraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EnvironmentConfigModule,
    KafkaModule,
    AntiFraudModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
