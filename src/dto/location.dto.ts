import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitude: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  accuracy: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  altitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  speed?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(360)
  @Type(() => Number)
  bearing?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  timestamp: number;

  @IsOptional()
  @IsString()
  provider?: string;
}
