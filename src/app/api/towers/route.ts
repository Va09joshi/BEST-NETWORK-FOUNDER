import { NextRequest } from 'next/server';
import { NetworkService } from '../../../features/networks/services/network.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { BadRequestError } from '../../../core/errors/ErrorHandler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('location_id');

    if (!locationId) {
      throw new BadRequestError('location_id is required');
    }

    const towers = await NetworkService.getTowersForLocation(locationId);
    return apiSuccess(towers, 'Towers fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}
