import { Inject, Injectable } from '@nestjs/common';
import { SNOWFLAKE_OPTION } from './snowflake.constants';
import { SnowflakeOptions } from './snowflake.type';

@Injectable()
export class SnowflakeService {
  constructor(@Inject(SNOWFLAKE_OPTION) options: SnowflakeOptions) {
    console.log('Will do something here in snowflake');
  }

  generateId(): number {
    return 1;
  }
}
