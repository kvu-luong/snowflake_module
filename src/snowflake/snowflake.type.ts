import { TRedisOptions } from 'src/redis/redis.type';
import { TZookeeperOptions } from 'src/zookeeper/zookeeper.type';

export type SnowflakeOptions = {
  nodeId?: number;
  redis: TRedisOptions;
  zookeeper: TZookeeperOptions;
};
