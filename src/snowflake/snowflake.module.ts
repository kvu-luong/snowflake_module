import { DynamicModule, Global, Module } from '@nestjs/common';
import { SnowflakeOptions } from './snowflake.type';
import { createProvider } from './snowflake.provider';
import { SnowflakeService } from './snowflake.service';
import { RedisModule } from 'src/redis/redis.module';
import { ZookeeperModule } from 'src/zookeeper/zookeeper.module';

@Module({})
export class SnowflakeModule {
  static forRoot(options: SnowflakeOptions): DynamicModule {
    const provider = createProvider(options);
    return {
      imports: [
        RedisModule.forRootAsync(options.redis),
        ZookeeperModule.forRoot(options.zookeeper),
      ],
      module: SnowflakeModule,
      providers: [provider, SnowflakeService],
      exports: [SnowflakeService],
    };
  }
}

@Global()
@Module({})
export class SnowflakeGlobalModule {
  static forRoot(options: SnowflakeOptions): DynamicModule {
    const provider = createProvider(options);
    return {
      module: SnowflakeGlobalModule,
      providers: [provider, SnowflakeService],
      exports: [SnowflakeService],
    };
  }
}
