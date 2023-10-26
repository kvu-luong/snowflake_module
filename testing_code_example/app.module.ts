import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnowflakeModule } from 'src';
@Module({
  imports: [SnowflakeModule.forRoot({ nodeId: 1 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
