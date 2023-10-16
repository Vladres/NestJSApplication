import { ApiProperty } from '@nestjs/swagger';

export class CityPopulationDto {
  @ApiProperty({ type: String, example: 'Dnipro' })
  city: string;

  @ApiProperty({ type: Number, example: 42223 })
  count: number;
}
