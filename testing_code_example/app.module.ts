import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnowflakeModule } from 'src';
import { RedisModule } from 'src/redis/redis.module';
@Module({
  imports: [
    SnowflakeModule.forRoot({ nodeId: 1 }),
    RedisModule.forRootAsync({
      db: 0,
      url: 'localhost:6379',
      prefix: 'snowflake',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
