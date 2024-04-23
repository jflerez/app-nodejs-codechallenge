import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';

@Module({
  imports: [
    EnvironmentConfigModule,
    CacheModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (config: EnvironmentConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: config.getRedisHost(),
        port: config.getRedisPort(),
        ttl: config.getRedisTTL(),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
