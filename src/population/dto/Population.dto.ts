import { ApiProperty } from '@nestjs/swagger';
import { CityMembersDto } from './CityMembers.dto';
import { CityPopulationDto } from './CityPopulation.dto';

export class PopulationDto {
  @ApiProperty({ type: [CityPopulationDto] })
  cities_population: CityPopulationDto[];

  @ApiProperty({ type: [CityMembersDto] })
  city_members: CityMembersDto[];
}
