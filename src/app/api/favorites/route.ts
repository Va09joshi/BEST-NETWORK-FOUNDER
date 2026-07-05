import { NextRequest } from 'next/server';
import { UserService } from '../../../features/users/services/user.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { UnauthorizedError, BadRequestError } from '../../../core/errors/ErrorHandler';

const getUserIdFromRequest = (request: NextRequest) => {
  const userId = request.headers.get('x-user-id');
  if (!userId) throw new UnauthorizedError();
  return userId;
};

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const favorites = await UserService.getUserFavorites(userId);
    return apiSuccess(favorites, 'Favorites fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const body = await request.json();
    const newFavorite = await UserService.addFavorite(userId, body);
    return apiSuccess(newFavorite, 'Favorite added successfully', 201);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('location_id');

    if (!locationId) {
      throw new BadRequestError('location_id is required');
    }

    await UserService.removeFavorite(userId, locationId);
    return apiSuccess(null, 'Favorite removed successfully');
  } catch (error) {
    return apiError(error);
  }
}
