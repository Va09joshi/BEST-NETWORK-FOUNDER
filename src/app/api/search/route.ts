import { NextRequest } from 'next/server';
import { SearchService } from '../../../features/search/services/search.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { BadRequestError } from '../../../core/errors/ErrorHandler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      throw new BadRequestError('Search query (q) is required');
    }

    const results = await SearchService.searchByQuery(query);
    return apiSuccess(results, 'Search successful');
  } catch (error) {
    return apiError(error);
  }
}
