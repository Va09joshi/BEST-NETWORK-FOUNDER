import { NextRequest } from 'next/server';
import { ReportService } from '../../../features/reports/services/report.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { BadRequestError } from '../../../core/errors/ErrorHandler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('location_id');

    if (!locationId) {
      throw new BadRequestError('location_id is required');
    }

    const reports = await ReportService.getReportsForLocation(locationId);
    return apiSuccess(reports, 'Reports fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}
