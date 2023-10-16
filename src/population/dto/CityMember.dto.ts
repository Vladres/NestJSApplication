import { ApiProperty } from '@nestjs/swagger';

export class CityMemberDto {
  @ApiProperty({ type: String, example: 'Alex' })
  first_name: string;

  @ApiProperty({ type: Number, example: 4352 })
  count: number;
}
