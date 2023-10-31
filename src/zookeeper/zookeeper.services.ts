import { Inject, Injectable } from '@nestjs/common';
import { ZOOKEEPER_OPTION } from './zookeeper.constants';
import * as Zookeeper from 'node-zookeeper-client';

@Injectable()
export class ZookeeperService {
  private readonly path: string = '/sequence';
  constructor(
    @Inject(ZOOKEEPER_OPTION) private readonly zookeeper: Zookeeper.Client,
  ) {
    console.log('Zookeeper service is running');
  }

  generateUniqueSequenceId(data: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.zookeeper.create(
        this.path,
        Buffer.from(data),
        Zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
        (error, path) => {
          if (error) {
            reject(error);
          } else {
            resolve(path);
          }
        },
      );
    });
  }

  close() {
    this.zookeeper.close();
  }
}
