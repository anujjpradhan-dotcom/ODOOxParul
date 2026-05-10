import { z } from 'zod';

export const citySearchSchema = z.object({
  query: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  costLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10').refine(val => val <= 50, 'Max limit is 50'),
  sortBy: z.enum(['popularity', 'name', 'cost']).optional().default('popularity'),
});

export const activitySearchSchema = z.object({
  query: z.string().optional(),
  cityId: z.string().cuid().optional(),
  category: z.enum(['SIGHTSEEING', 'FOOD', 'ADVENTURE', 'NIGHTLIFE', 'CULTURE', 'RELAXATION', 'OTHER']).optional(),
  minCost: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxCost: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxDuration: z.string().regex(/^\d+$/).transform(Number).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
});

export const addActivityToStopSchema = z.object({
  activityId: z.string().cuid('Invalid activity ID'),
  scheduledDate: z.string().datetime().optional(),
  scheduledTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format HH:mm').optional(),
  customCost: z.number().nonnegative().optional(),
  notes: z.string().optional(),
});
