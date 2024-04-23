import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InfraRedis } from './redis.interface';

@Injectable()
export class RedisService implements InfraRedis {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value): Promise<any> {
    return await this.cacheManager.set(key, value);
  }
}
