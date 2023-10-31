import { Injectable } from '@nestjs/common';
import { SnowflakeService } from 'src';

@Injectable()
export class AppService {
  constructor(private readonly snowFlakeService: SnowflakeService) {}
  getHello(): number {
    return this.snowFlakeService.generateId();
  }

  async generateSlakeHash(): Promise<number> {
    return this.snowFlakeService.generateSlakeHash();
  }
}
