import { Injectable } from '@nestjs/common';
import { SnowflakeService } from 'src';

@Injectable()
export class AppService {
  constructor(private readonly snowFlakeService: SnowflakeService) {}
  getHello(): number {
    return this.snowFlakeService.generateId();
  }
}
