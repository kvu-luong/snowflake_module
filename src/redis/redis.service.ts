import { Injectable } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly repository: RedisRepository) {}

  async getTimestampAtUTC(): Promise<number> {
    return this.repository.getTimestampInMillisecond();
  }
}
