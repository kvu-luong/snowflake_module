import { Provider } from '@nestjs/common';
import { TZookeeperOptions } from './zookeeper.type';
import { ZOOKEEPER_OPTION } from './zookeeper.constants';
import * as zookeeper from 'node-zookeeper-client';

export function createProvider(
  zookeeperOptions: TZookeeperOptions,
): Provider<TZookeeperOptions> {
  return {
    provide: ZOOKEEPER_OPTION,
    useFactory: () => {
      try {
        const client = zookeeper.createClient(zookeeperOptions?.hostUrl);
        client.once('connected', () => {
          console.log(`Connected to ZooKeeper ${new Date()}`);
          // Now you can perform ZooKeeper operations safely
        });

        client.on('disconnected', () => {
          console.error('ZooKeeper client disconnected');
          // Handle disconnect event, if needed
        });
        client.connect();
        return client;
      } catch (error) {
        console.warn('Not using zookeeper');
      }
    },
  };
}
