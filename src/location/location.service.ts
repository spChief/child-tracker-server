import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async createLocation(locationDto: LocationDto): Promise<Location> {
    const location = this.locationRepository.create(locationDto);
    return await this.locationRepository.save(location);
  }

  async createLocationsBatch(locationDtos: LocationDto[]): Promise<Location[]> {
    const locations = this.locationRepository.create(locationDtos);
    return await this.locationRepository.save(locations);
  }

  async getLocationsByDevice(deviceId: string): Promise<Location[]> {
    return await this.locationRepository.find({
      where: { deviceId },
      order: { timestamp: 'DESC' },
    });
  }

  async getLocationsByDeviceAndDateRange(
    deviceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Location[]> {
    return await this.locationRepository
      .createQueryBuilder('location')
      .where('location.deviceId = :deviceId', { deviceId })
      .andWhere('location.timestamp >= :startDate', { startDate: startDate.getTime() })
      .andWhere('location.timestamp <= :endDate', { endDate: endDate.getTime() })
      .orderBy('location.timestamp', 'DESC')
      .getMany();
  }
}
