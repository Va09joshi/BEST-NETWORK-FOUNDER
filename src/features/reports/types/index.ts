import { z } from 'zod';

export const ReportSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  operator_id: z.string().uuid(),
  location_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  speed_mbps: z.number().optional(),
  feedback_text: z.string().max(1000).optional(),
  is_verified: z.boolean().optional(),
  created_at: z.string().optional(),
});

export type Report = z.infer<typeof ReportSchema>;

export const CreateReportInputSchema = ReportSchema.omit({ 
  id: true, 
  created_at: true,
  is_verified: true 
});

export type CreateReportInput = z.infer<typeof CreateReportInputSchema>;
