import { z } from 'zod';

export const OperatorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().optional(),
  created_at: z.string().optional(),
});

export type Operator = z.infer<typeof OperatorSchema>;

export const TowerSchema = z.object({
  id: z.string().uuid(),
  operator_id: z.string().uuid(),
  location_id: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  signal_strength: z.string().optional(),
  has_5g: z.boolean().default(false),
});

export type Tower = z.infer<typeof TowerSchema>;

export const NetworkScoreSchema = z.object({
  id: z.string().uuid(),
  operator_id: z.string().uuid(),
  location_id: z.string().uuid(),
  avg_speed_mbps: z.number().optional(),
  reliability_percentage: z.number().optional(),
  avg_ping_ms: z.number().optional(),
  community_rating: z.number().optional(),
});

export type NetworkScore = z.infer<typeof NetworkScoreSchema>;
