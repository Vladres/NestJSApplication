import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { LoggingModule } from './logging';
import { PopulationModule } from './population';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LoggingModule,
    PopulationModule,
  ],
})
export class AppModule {}
