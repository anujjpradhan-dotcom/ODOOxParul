import { z } from 'zod';

export const createPackingItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  category: z.enum(['CLOTHING', 'TOILETRIES', 'ELECTRONICS', 'DOCUMENTS', 'MEDICATION', 'OTHER']),
  quantity: z.number().min(1).max(99).optional().default(1),
});

export const updatePackingItemSchema = createPackingItemSchema.partial().extend({
  isPacked: z.boolean().optional(),
});

export const bulkCreatePackingSchema = z.object({
  items: z.array(createPackingItemSchema).max(50, 'Max 50 items at once'),
});
