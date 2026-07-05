import { NextRequest } from 'next/server';
import { SearchService } from '../../../features/search/services/search.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { BadRequestError } from '../../../core/errors/ErrorHandler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('id');

    if (!locationId) {
      throw new BadRequestError('Location id is required');
    }

    const location = await SearchService.getLocationDetails(locationId);
    return apiSuccess(location, 'Location fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}
