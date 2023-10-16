import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingDataDto } from './dto';

@ApiTags('Logging')
@Controller('/logging')
export class LoggingController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  saveLog(@Body() loggingData: LoggingDataDto): Promise<void> {
    console.log('Logger endpoint, data: ', loggingData);
    return;
  }
}
