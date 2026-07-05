import { supabase } from '../../../core/db/supabase';
import { Operator } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class OperatorRepository {
  static async getAllOperators(): Promise<Operator[]> {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .order('name');

    if (error) {
      throw new InternalServerError(`Failed to fetch operators: ${error.message}`);
    }

    return data as Operator[];
  }

  static async getOperatorById(id: string): Promise<Operator | null> {
    const { data, error } = await supabase
      .from('operators')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is not found
      throw new InternalServerError(`Failed to fetch operator: ${error.message}`);
    }

    return data as Operator | null;
  }
}
