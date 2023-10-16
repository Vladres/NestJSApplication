import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingController } from './logging.controller';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [ConfigModule],
  controllers: [LoggingController],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor, ConfigModule],
})
export class LoggingModule {}
