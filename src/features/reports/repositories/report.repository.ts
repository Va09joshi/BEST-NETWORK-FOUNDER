import { supabase } from '../../../core/db/supabase';
import { Report, CreateReportInput } from '../types';
import { InternalServerError } from '../../../core/errors/ErrorHandler';

export class ReportRepository {
  static async getReportsByLocation(locationId: string): Promise<Report[]> {
    const { data, error } = await supabase
      .from('reports')
      .select('*, profiles(display_name, avatar_url), operators(name, color)')
      .eq('location_id', locationId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerError(`Failed to fetch reports: ${error.message}`);
    }

    return data as any[];
  }

  static async createReport(reportData: CreateReportInput): Promise<Report> {
    const { data, error } = await supabase
      .from('reports')
      .insert([reportData])
      .select()
      .single();

    if (error) {
      throw new InternalServerError(`Failed to create report: ${error.message}`);
    }

    return data as Report;
  }
}
