import { NextRequest } from 'next/server';
import { ReportService } from '../../../features/reports/services/report.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newReport = await ReportService.submitReport(body);
    
    return apiSuccess(newReport, 'Report submitted successfully', 201);
  } catch (error) {
    return apiError(error);
  }
}
