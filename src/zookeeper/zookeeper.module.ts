import { DynamicModule, Module } from '@nestjs/common';
import { TZookeeperOptions } from './zookeeper.type';
import { createProvider } from './zookeeper.provider';
import { ZookeeperService } from './zookeeper.services';

@Module({})
export class ZookeeperModule {
  static forRoot(options: TZookeeperOptions): DynamicModule {
    const provider = createProvider(options);
    return {
      module: ZookeeperModule,
      providers: [provider, ZookeeperService],
      exports: [ZookeeperService],
    };
  }
}
