import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: string;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  make: string;
  @Expose()
  mileage: number;
  @Expose()
  model: string;
  @Expose()
  price: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
  @Expose()
  year: number;
}
