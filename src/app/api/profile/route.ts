import { NextRequest } from 'next/server';
import { UserService } from '../../../features/users/services/user.service';
import { apiSuccess, apiError } from '../../../core/utils/apiResponse';
import { UnauthorizedError } from '../../../core/errors/ErrorHandler';

// Helper to simulate auth extraction (in production, use Supabase Auth middleware)
const getUserIdFromRequest = (request: NextRequest) => {
  const userId = request.headers.get('x-user-id');
  if (!userId) throw new UnauthorizedError();
  return userId;
};

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const profile = await UserService.getProfile(userId);
    return apiSuccess(profile, 'Profile fetched successfully');
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const body = await request.json();
    const updatedProfile = await UserService.updateProfile(userId, body);
    return apiSuccess(updatedProfile, 'Profile updated successfully');
  } catch (error) {
    return apiError(error);
  }
}
