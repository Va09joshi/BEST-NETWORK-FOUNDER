import { supabase } from '../../../core/db/supabase';
import { Profile, UpdateProfileInput } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class ProfileRepository {
  static async getProfileById(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new InternalServerError(`Failed to fetch profile: ${error.message}`);
    }

    return data as Profile | null;
  }

  static async updateProfile(userId: string, profileData: UpdateProfileInput): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new InternalServerError(`Failed to update profile: ${error.message}`);
    }

    return data as Profile;
  }
}
