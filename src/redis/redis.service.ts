import { Injectable } from '@nestjs/common';
import { RedisRepository } from './redis.repository';
import { SEQUENCE_NUMBER_KEY } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(private readonly repository: RedisRepository) {}

  async getTimestampAtUTC(): Promise<number> {
    return this.repository.getTimestampInMillisecond();
  }

  async getSequenceNumber(): Promise<number> {
    return await this.repository.incr(SEQUENCE_NUMBER_KEY);
  }
}
