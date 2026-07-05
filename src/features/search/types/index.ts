import { z } from 'zod';

export const LocationSchema = z.object({
  id: z.string().uuid(),
  pincode: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type Location = z.infer<typeof LocationSchema>;

export const SearchQuerySchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters'),
});
