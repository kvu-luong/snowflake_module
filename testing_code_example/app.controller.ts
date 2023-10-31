import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from 'src/redis/redis.service';
import { ZookeeperService } from 'src/zookeeper/zookeeper.services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
    private readonly zookeeperService: ZookeeperService,
  ) {}

  @Get()
  getHello(): number {
    return this.appService.getHello();
  }

  @Get('/getTime')
  async getTimeFromRedis(): Promise<number> {
    return await this.redisService.getTimestampAtUTC();
  }

  @Get('/getIdFromZKeeper')
  async getIdFromZKeeper(): Promise<number> {
    return await this.zookeeperService.generateUniqueSequenceId('node');
  }

  @Get('/zoo')
  async getZoo() {
    return this.appService.generateSlakeHash();
  }
}
