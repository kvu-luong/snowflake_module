import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';

@Injectable()
export class SnowflakeService {
  constructor(
    private readonly redisService: RedisService,
    private readonly zooKeeperService: ZookeeperService,
  ) {
    console.log('Will do something here in snowflake');
  }

  generateId(): number {
    return 1;
  }
  async generateSlakeHash(): Promise<number> {
    const timestamp41Bits = await this.redisService.getTimestampAtUTC(); // Fetch the 43-bit timestamp from Redis
    const zooKeeperNode10Bits =
      await this.zooKeeperService.generateUniqueSequenceId('node'); // Fetch the 10 bits from ZooKeeper node
    const sequence12Bits = await this.redisService.getSequenceNumber(); // Fetch the 12-bit sequence number from Redis

    const uniqueId =
      (0 << 63) |
      (timestamp41Bits << 22) |
      (zooKeeperNode10Bits << 12) |
      sequence12Bits;
    return uniqueId;
  }
}
