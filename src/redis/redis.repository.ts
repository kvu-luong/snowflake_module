import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepository {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async getTimestampInMillisecond() {
    const [seconds, microseconds] = await this.client.time();
    const timestampInMilliseconds =
      seconds * 1000 + Math.round(microseconds / 1000);
    return timestampInMilliseconds;
  }
}
