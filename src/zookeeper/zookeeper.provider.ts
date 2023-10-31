import { Provider } from '@nestjs/common';
import { TZookeeperOptions } from './zookeeper.type';
import { ZOOKEEPER_OPTION } from './zookeeper.constants';
import * as zookeeper from 'node-zookeeper-client';

export function createProvider(
  zookeeperOptions: TZookeeperOptions,
): Provider<TZookeeperOptions> {
  console.log(zookeeperOptions, 'configure');
  return {
    provide: ZOOKEEPER_OPTION,
    useFactory: () => {
      const client = zookeeper.createClient(zookeeperOptions.hostUrl);
      client.once('connected', () => {
        console.log('Connected to ZooKeeper');
        // Now you can perform ZooKeeper operations safely
      });

      client.on('disconnected', () => {
        console.error('ZooKeeper client disconnected');
        // Handle disconnect event, if needed
      });
      client.connect();
      return client;
    },
  };
}