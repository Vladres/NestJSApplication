import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity, ResidentEntity } from './entities';
import { PopulationController } from './population.controller';
import { PopulationService } from './population.service';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, ResidentEntity])],
  controllers: [PopulationController],
  providers: [PopulationService],
  exports: [PopulationService],
})
export class PopulationModule {}
