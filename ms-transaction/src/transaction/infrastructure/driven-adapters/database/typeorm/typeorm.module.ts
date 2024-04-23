import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../../../config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../../../config/environment-config/environment-config.module';
import {
  TransactionEntity,
  TransactionTypeEntity,
} from '../../../../../transaction/domain/entities';
export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [TransactionEntity, TransactionTypeEntity],
    migrations: [__dirname + './../../**/migrations/**/*{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: ['error'],
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
