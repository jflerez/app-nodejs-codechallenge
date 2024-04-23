import { Module, forwardRef } from '@nestjs/common';
import { TransactionUseCaseService } from './application/usecases/transaction/transaction-use-case.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './domain/entities/transaction.entity';
import { TransactionResolver } from './infrastructure/api/graphql/resolvers/transaction/transaction.resolver';
import { KafkaModule } from './infrastructure/driven-adapters/message-queues/kafka/kafka.module';
import { TransactionRepository } from './domain/repository/transaction.repository';
import { KafkaService } from './infrastructure/driven-adapters/message-queues/kafka/kafka.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { RedisModule } from './infrastructure/driven-adapters/redis/redis.module';
import { TransactionTypeUseCaseService } from './application/usecases/transaction-type/transaction-type-use-case.service';
import { TransactionTypeRepository } from './domain/repository/transaction-type.repository';
import { TransactionTypeEntity } from './domain/entities';

@Module({
  controllers: [],
  providers: [
    TransactionResolver,
    TransactionRepository,
    TransactionUseCaseService,
    TransactionTypeUseCaseService,
    TransactionTypeRepository,
    KafkaService,
  ],
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, TransactionTypeEntity]),
    forwardRef(() => KafkaModule),
    EnvironmentConfigModule,
    RedisModule,
  ],
  exports: [TransactionUseCaseService],
})
export class TransactionModule {}
