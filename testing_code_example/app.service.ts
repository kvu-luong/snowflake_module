import { Injectable } from '@nestjs/common';
import { SnowflakeService } from 'src';
import { RedisService } from 'src/redis/redis.service';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';

@Injectable()
export class AppService {
  constructor(
    private readonly snowFlakeService: SnowflakeService,
    private readonly zooKeeperService: ZookeeperService,
    private readonly redisService: RedisService,
  ) {}
  getHello(): number {
    return this.snowFlakeService.generateId();
  }

  async testOther(): Promise<number> {
    return await this.zooKeeperService.generateUniqueSequenceId('data');
  }

  async generateSlakeHash(): Promise<number> {
    const timestamp41Bits = await this.redisService.getTimestampAtUTC(); // Fetch the 43-bit timestamp from Redis
    const zooKeeperNode10Bits =
      await this.zooKeeperService.generateUniqueSequenceId('node'); // Fetch the 10 bits from ZooKeeper node
    const sequence12Bits = await this.redisService.getSequenceNumber(); // Fetch the 12-bit sequence number from Redis

    // Combine the components into a 65-bit ID
    // const customId =
    //   (timestamp43Bits << 22) | (zooKeeperNode10Bits << 12) | sequence12Bits;
    const customId =
      (0 << 63) |
      (timestamp41Bits << 22) |
      (zooKeeperNode10Bits << 12) |
      sequence12Bits;
    return customId;
  }
}
