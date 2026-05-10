import { z } from 'zod';

export const createTripSchema = z.object({
  name: z.string().min(1, 'Trip name is required'),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  coverImageUrl: z.string().url().optional(),
  totalBudget: z.number().positive().optional(),
  isPublic: z.boolean().optional().default(false),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const updateTripSchema = createTripSchema.partial().extend({
  status: z.enum(['DRAFT', 'PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) > new Date(data.startDate);
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const tripIdParamSchema = z.object({
  id: z.string().cuid('Invalid trip ID'),
});

export const tripListQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
  status: z.enum(['DRAFT', 'PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
  sortBy: z.enum(['date', 'name', 'created']).optional().default('created'),
});
