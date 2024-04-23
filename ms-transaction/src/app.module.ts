import { Module, OnModuleInit } from '@nestjs/common';
import { EnvironmentConfigModule } from './transaction/infrastructure/config/environment-config/environment-config.module';
import { KafkaModule } from './transaction/infrastructure/driven-adapters/message-queues/kafka/kafka.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmConfigModule } from './transaction/infrastructure/driven-adapters/database/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { RedisModule } from './transaction/infrastructure/driven-adapters/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    KafkaModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: ({ message, extensions }) => {
        console.log('extensions', extensions);
        return {
          message,
          extensions,
        };
      },
    }),
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private connection: DataSource) {}

  async onModuleInit() {
    await this.runMigrations();
  }

  private async runMigrations() {
    try {
      await this.connection.runMigrations();
      console.log('Migraciones ejecutadas exitosamente');
    } catch (error) {
      console.error('Error al ejecutar migraciones:', error);
    }
  }
}
