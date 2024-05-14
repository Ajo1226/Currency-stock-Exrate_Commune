import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
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
