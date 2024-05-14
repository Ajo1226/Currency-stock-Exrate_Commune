import { IsNumber, IsString, Max, Min } from 'class-validator';
import { IsLongitude } from 'class-validator';
import { IsLatitude } from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2024)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLongitude()
  lng: number;
  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
