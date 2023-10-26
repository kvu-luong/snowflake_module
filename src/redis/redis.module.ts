import { DynamicModule, Module } from '@nestjs/common';
import { TRedisOptions } from './redis.type';
import { createProvider } from './redis.provider';
import { RedisService } from './redis.service';
import { RedisRepository } from './redis.repository';

@Module({})
export class RedisModule {
  static forRootAsync(options: TRedisOptions): DynamicModule {
    const provider = createProvider(options);
    return {
      module: RedisModule,
      providers: [provider, RedisService, RedisRepository],
      exports: [RedisService],
    };
  }
}
