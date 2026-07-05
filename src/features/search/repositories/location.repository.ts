import { supabase } from '../../../core/db/supabase';
import { Location } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class LocationRepository {
  static async searchLocations(query: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .or(`pincode.ilike.%${query}%,city.ilike.%${query}%`)
      .limit(10);

    if (error) {
      throw new InternalServerError(`Failed to search locations: ${error.message}`);
    }

    return data as Location[];
  }

  static async getLocationById(id: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new InternalServerError(`Failed to fetch location: ${error.message}`);
    }

    return data as Location | null;
  }
}
