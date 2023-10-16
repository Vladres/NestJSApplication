import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../logging';
import { PopulationDto } from './dto';
import { PopulationService } from './population.service';

@ApiTags('Population')
@Controller('/population')
export class PopulationController {
  constructor(private readonly populationService: PopulationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get population data',
    description: 'Retrieve population data for cities and city members.',
  })
  @ApiQuery({
    name: 'partialCityName',
    required: false,
    description: 'Partial city name for filtering population data.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: PopulationDto,
  })
  @UseInterceptors(LoggingInterceptor)
  getPopulationData(
    @Query('partialCityName') partialCityName: string,
  ): Promise<PopulationDto> {
    return this.populationService.getPopulationData(partialCityName);
  }
}
