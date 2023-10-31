import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';
import { SNOWFLAKE_OPTION } from './snowflake.constants';
import { SnowflakeOptions } from './snowflake.type';
import { NODE_ID, SEQUENCE_NUMBER_KEY } from 'src/redis/redis.constants';

@Injectable()
export class SnowflakeService {
  constructor(
    @Inject(SNOWFLAKE_OPTION) private readonly options: SnowflakeOptions,
    private readonly redisService: RedisService,
    private readonly zooKeeperService: ZookeeperService,
  ) {}

  generateId(): number {
    return 1;
  }
  async generateSlakeHash(): Promise<string> {
    const timestamp41Bits = await this.redisService.getTimestampAtUTC(); // Fetch the 41-bit timestamp from Redis
    const zooKeeperNode10Bits = await this.getNodeId(
      this.options.isUseRedisOnly,
    ); // Fetch the 10 bits from ZooKeeper node
    const sequence12Bits = await this.redisService.getSequenceNumber(
      SEQUENCE_NUMBER_KEY.toString(),
    ); // Fetch the 12-bit sequence number from Redis
    // This uniqueId have been change the order.
    const binarySnowflakeId =
      '0' +
      timestamp41Bits.toString(2).padStart(41, '0') +
      sequence12Bits.toString(2).padStart(12, '0') +
      zooKeeperNode10Bits.toString(2).padStart(10, '0');
    return binarySnowflakeId;
  }

  private async getNodeId(isUseRedisOnly = false): Promise<number> {
    if (isUseRedisOnly) {
      return await this.redisService.getSequenceNumber(NODE_ID.toString());
    }
    return await this.zooKeeperService.generateUniqueSequenceId('node');
  }
}
