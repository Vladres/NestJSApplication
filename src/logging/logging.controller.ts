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
  async saveLog(@Body() loggingData: LoggingDataDto): Promise<void> {
    // Add a delay of 1 second (1000 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Logger endpoint, data: ', loggingData);

    // Returning a resolved Promise to indicate completion
    return Promise.resolve();
  }
}
