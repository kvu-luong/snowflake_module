import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly redisService: RedisService, // private readonly zookeeperService: ZookeeperService,
  ) {}

  @Get()
  getHello(): number {
    return this.appService.getHello();
  }

  @Get('/zoo')
  async getZoo() {
    return this.appService.generateSlakeHash();
  }
}
