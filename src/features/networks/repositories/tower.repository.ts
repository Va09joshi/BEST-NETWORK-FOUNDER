import { supabase } from '../../../core/db/supabase';
import { Tower, NetworkScore } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class TowerRepository {
  static async getTowersByLocation(locationId: string): Promise<Tower[]> {
    const { data, error } = await supabase
      .from('towers')
      .select('*, operators(name, color)')
      .eq('location_id', locationId);

    if (error) {
      throw new InternalServerError(`Failed to fetch towers: ${error.message}`);
    }

    return data as any[];
  }
}

export class NetworkScoreRepository {
  static async getScoresByLocation(locationId: string): Promise<NetworkScore[]> {
    const { data, error } = await supabase
      .from('network_scores')
      .select('*, operators(name, color)')
      .eq('location_id', locationId);

    if (error) {
      throw new InternalServerError(`Failed to fetch network scores: ${error.message}`);
    }

    return data as any[];
  }
}
