import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from '../dto/location.dto';
import { LocationBatchDto } from '../dto/location-batch.dto';

@Controller()
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post('location')
  @HttpCode(HttpStatus.OK)
  async sendLocation(
    @Body(new ValidationPipe({ transform: true })) location: LocationDto,
  ): Promise<{ success: boolean }> {
    await this.locationService.createLocation(location);
    return { success: true };
  }

  @Post('locations/batch')
  @HttpCode(HttpStatus.OK)
  async sendLocationsBatch(
    @Body(new ValidationPipe({ transform: true })) batchDto: LocationBatchDto,
  ): Promise<{ success: boolean }> {
    await this.locationService.createLocationsBatch(batchDto.locations);
    return { success: true };
  }

  @Get('view')
  async getViewData(
    @Query('deviceId') deviceId: string,
    @Query('all') all: string,
  ) {
    if (!deviceId) {
      throw new BadRequestException('deviceId parameter is required');
    }

    const showAll = all === 'true' || all === '1';
    const locations = await this.locationService.getLocationsForView(
      deviceId,
      showAll,
    ).then((locations) => locations.reverse());
    return { locations };
  }
}
