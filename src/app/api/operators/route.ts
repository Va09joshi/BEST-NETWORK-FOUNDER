import { NextRequest } from 'next/server';
import { NetworkService } from '../../../features/networks/services/network.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';

export async function GET(request: NextRequest) {
  try {
    const operators = await NetworkService.getAllOperators();
    return apiSuccess(operators, 'Operators fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}
