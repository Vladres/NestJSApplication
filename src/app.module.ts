import { Module } from '@nestjs/common';
import { DBModule } from './db';
import { LoggingModule } from './logging';
import { PopulationModule } from './population';

@Module({
  imports: [DBModule, LoggingModule, PopulationModule],
})
export class AppModule {}
