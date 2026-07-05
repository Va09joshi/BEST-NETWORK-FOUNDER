import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  display_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const UpdateProfileInputSchema = ProfileSchema.omit({
  id: true,
  email: true,
  created_at: true,
  updated_at: true,
}).partial();

export type UpdateProfileInput = z.infer<typeof UpdateProfileInputSchema>;

export const FavoriteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  location_id: z.string().uuid(),
  created_at: z.string().optional(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;

export const AddFavoriteInputSchema = z.object({
  location_id: z.string().uuid(),
});
