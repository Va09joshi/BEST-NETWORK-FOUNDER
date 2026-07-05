import { supabase } from '../../../core/db/supabase';
import { Favorite } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class FavoriteRepository {
  static async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, locations(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerError(`Failed to fetch favorites: ${error.message}`);
    }

    return data as any[];
  }

  static async addFavorite(userId: string, locationId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, location_id: locationId }])
      .select()
      .single();

    if (error) {
      throw new InternalServerError(`Failed to add favorite: ${error.message}`);
    }

    return data as Favorite;
  }

  static async removeFavorite(userId: string, locationId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, location_id: locationId });

    if (error) {
      throw new InternalServerError(`Failed to remove favorite: ${error.message}`);
    }
  }
}
