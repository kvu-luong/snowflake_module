import { Inject, Injectable } from '@nestjs/common';
import { SNOWFLAKE_OPTION } from './snowflake.constants';
import { SnowflakeOptions } from './snowflake.interface';

@Injectable()
export class SnowflakeService {
  constructor(@Inject(SNOWFLAKE_OPTION) options: SnowflakeOptions) {}

  generateId(): number {
    return 1;
  }
}
