import { Injectable } from '@nestjs/common';
import { SnowflakeService } from 'src';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';

@Injectable()
export class AppService {
  constructor(
    private readonly snowFlakeService: SnowflakeService,
    private readonly zookeeperService: ZookeeperService,
  ) {}
  getHello(): number {
    return this.snowFlakeService.generateId();
  }

  async testOther(): Promise<string> {
    return await this.zookeeperService.generateUniqueSequenceId('data');
  }
}
