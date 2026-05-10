import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().optional().nullable().transform(v => v || undefined),
  lastName: z.string().optional().nullable().transform(v => v || undefined),
  avatar: z.string().url().optional().nullable().transform(v => v || undefined),
  languagePreference: z.enum(['en', 'es', 'fr', 'de', 'ja', 'zh', 'hi', 'ar']).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required to delete account'),
});
