import { ReportRepository } from '../repositories/report.repository';
import { CreateReportInput, CreateReportInputSchema } from '../types';
import { BadRequestError } from '../../../core/errors/ErrorHandler';

export class ReportService {
  static async getReportsForLocation(locationId: string) {
    if (!locationId) throw new BadRequestError('Location ID is required');
    return await ReportRepository.getReportsByLocation(locationId);
  }

  static async submitReport(reportData: unknown) {
    // Validate input using Zod
    const validatedData = CreateReportInputSchema.safeParse(reportData);
    
    if (!validatedData.success) {
      throw new BadRequestError(`Validation failed: ${validatedData.error.message}`);
    }

    // Business Logic: Check for spam, check user limits, etc.
    // For now, simply insert
    return await ReportRepository.createReport(validatedData.data);
  }
}
