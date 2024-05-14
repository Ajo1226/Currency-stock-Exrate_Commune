import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make ', { make })
      .andWhere('model = :model ', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  create(user: User, reportData: CreateReportDto) {
    const report = this.repo.create(reportData);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(reportId: string, isApproved: boolean) {
    const report = await this.repo.findOne({
      where: { id: parseInt(reportId) },
    });
    if (!report) {
      throw new NotFoundException(`Report not found`);
    }
    report.approved = isApproved;
    return this.repo.save(report);
  }
}
