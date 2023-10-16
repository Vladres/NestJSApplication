import { Module } from '@nestjs/common';
import { DBModule } from '../db';
import { PopulationController } from './population.controller';
import { PopulationService } from './population.service';

@Module({
  imports: [DBModule],
  controllers: [PopulationController],
  providers: [PopulationService],
  exports: [PopulationService],
})
export class PopulationModule {}
