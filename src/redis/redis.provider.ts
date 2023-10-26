import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { Provider } from '@nestjs/common';
import { TRedisOptions } from './redis.type';

export function createProvider(options: TRedisOptions): Provider<Redis> {
  return {
    provide: REDIS_CLIENT,
    useFactory: () => {
      const option: RedisOptions = {
        keyPrefix: options.prefix,
        db: options.db,
      };

      return new Redis(options.url, option);
    },
  };
}
