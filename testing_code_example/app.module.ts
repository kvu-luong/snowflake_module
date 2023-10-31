import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnowflakeModule } from 'src';

@Module({
  imports: [
    SnowflakeModule.forRoot({
      nodeId: 1,
      redis: {
        db: 0,
        url: 'localhost:6379',
        prefix: 'snowflake',
      },
      zookeeper: {
        hostUrl: 'localhost:2181',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
