import { ApiProperty } from '@nestjs/swagger';
import { CityMemberDto } from './CityMember.dto';

export class CityMembersDto {
  @ApiProperty({ type: String, example: 'Dnipro' })
  city: string;

  @ApiProperty({ type: [CityMemberDto] })
  members: CityMemberDto[];
}
