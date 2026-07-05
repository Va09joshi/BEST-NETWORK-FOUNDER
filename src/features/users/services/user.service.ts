import { ProfileRepository } from '../repositories/profile.repository';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { UpdateProfileInputSchema, AddFavoriteInputSchema } from '../types';
import { BadRequestError, NotFoundError } from '../../../core/errors/ErrorHandler';

export class UserService {
  // Profile Methods
  static async getProfile(userId: string) {
    if (!userId) throw new BadRequestError('User ID is required');
    const profile = await ProfileRepository.getProfileById(userId);
    if (!profile) throw new NotFoundError('Profile not found');
    return profile;
  }

  static async updateProfile(userId: string, data: unknown) {
    if (!userId) throw new BadRequestError('User ID is required');
    
    const validation = UpdateProfileInputSchema.safeParse(data);
    if (!validation.success) {
      throw new BadRequestError(`Validation failed: ${validation.error.message}`);
    }

    return await ProfileRepository.updateProfile(userId, validation.data);
  }

  // Favorite Methods
  static async getUserFavorites(userId: string) {
    if (!userId) throw new BadRequestError('User ID is required');
    return await FavoriteRepository.getFavoritesByUser(userId);
  }

  static async addFavorite(userId: string, data: unknown) {
    if (!userId) throw new BadRequestError('User ID is required');
    
    const validation = AddFavoriteInputSchema.safeParse(data);
    if (!validation.success) {
      throw new BadRequestError(`Validation failed: ${validation.error.message}`);
    }

    return await FavoriteRepository.addFavorite(userId, validation.data.location_id);
  }

  static async removeFavorite(userId: string, locationId: string) {
    if (!userId) throw new BadRequestError('User ID is required');
    if (!locationId) throw new BadRequestError('Location ID is required');
    
    await FavoriteRepository.removeFavorite(userId, locationId);
    return { success: true };
  }
}
