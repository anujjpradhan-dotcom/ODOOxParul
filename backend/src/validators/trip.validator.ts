import { z } from 'zod';

const tripBaseSchema = z.object({
  name: z.string().min(1, 'Trip name is required').trim(),
  description: z.string().optional().nullable().transform(val => val || undefined),
  startDate: z.string().transform((val) => new Date(val).toISOString()),
  endDate: z.string().transform((val) => new Date(val).toISOString()),
  coverImageUrl: z.string().url().optional().nullable().or(z.literal("")).transform(val => val || undefined),
  totalBudget: z.coerce.number().nonnegative().optional().nullable().transform(val => val === null ? undefined : val),
  isPublic: z.coerce.boolean().optional().default(false),
});

export const createTripSchema = tripBaseSchema.refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be at or after start date",
  path: ["endDate"],
});

export const updateTripSchema = tripBaseSchema.partial().extend({
  status: z.enum(['DRAFT', 'PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: "End date must be at or after start date",
  path: ["endDate"],
});

export const tripIdParamSchema = z.object({
  id: z.string().min(1, 'Invalid trip ID'),
});

export const tripListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
  status: z.enum(['DRAFT', 'PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
  sortBy: z.enum(['date', 'name', 'created']).optional().default('created'),
});
