import { NextRequest } from 'next/server';
import { SearchService } from '../../../features/search/services/search.service';
import { NetworkService } from '../../../features/networks/services/network.service';
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

    // Fetch all dashboard data concurrently
    const [location, scores, towers, reports] = await Promise.all([
      SearchService.getLocationDetails(locationId),
      NetworkService.getNetworkScoresForLocation(locationId),
      NetworkService.getTowersForLocation(locationId),
      ReportService.getReportsForLocation(locationId),
    ]);

    const dashboardData = {
      location,
      scores,
      towers,
      reports,
    };

    return apiSuccess(dashboardData, 'Dashboard data fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}
