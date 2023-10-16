import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoggingDataDto {
  @ApiProperty({ type: Number })
  duration: number;

  @ApiProperty()
  requestData: unknown;

  @ApiProperty()
  responseData: unknown;

  @ApiProperty({ type: Number })
  httpStatus: HttpStatus;
}
