import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from 'src/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  getHello(): number {
    return this.appService.getHello();
  }

  @Get('/getTime')
  async getTimeFromRedis(): Promise<number> {
    return await this.redisService.getTimestampAtUTC();
  }
}
