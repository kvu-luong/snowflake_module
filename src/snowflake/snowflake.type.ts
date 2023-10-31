import { TRedisOptions } from 'src/redis/redis.type';
import { TZookeeperOptions } from 'src/zookeeper/zookeeper.type';

export type SnowflakeOptions = {
  isUseRedisOnly: boolean;
  redis: TRedisOptions;
  zookeeper?: TZookeeperOptions;
};
