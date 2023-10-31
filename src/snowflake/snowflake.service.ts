import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';

@Injectable()
export class SnowflakeService {
  constructor(
    private readonly redisService: RedisService,
    private readonly zooKeeperService: ZookeeperService,
  ) {}

  generateId(): number {
    return 1;
  }
  async generateSlakeHash(): Promise<string> {
    const timestamp41Bits = await this.redisService.getTimestampAtUTC(); // Fetch the 41-bit timestamp from Redis
    const zooKeeperNode10Bits =
      await this.zooKeeperService.generateUniqueSequenceId('node'); // Fetch the 10 bits from ZooKeeper node
    const sequence12Bits = await this.redisService.getSequenceNumber(); // Fetch the 12-bit sequence number from Redis

    const binarySnowflakeId =
      '0' +
      timestamp41Bits.toString(2).padStart(41, '0') +
      zooKeeperNode10Bits.toString(2).padStart(10, '0') +
      sequence12Bits.toString(2).padStart(12, '0');
    return binarySnowflakeId;
  }
}
