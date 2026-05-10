import { z } from 'zod';

export const createPackingItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  category: z.enum(['CLOTHING', 'DOCUMENTS', 'ELECTRONICS', 'TOILETRIES', 'MEDICATION', 'ACCESSORIES', 'OTHER']),
  quantity: z.coerce.number().min(1).max(99).optional().default(1),
});

export const updatePackingItemSchema = createPackingItemSchema.partial().extend({
  isPacked: z.boolean().optional(),
});

export const bulkCreatePackingSchema = z.object({
  items: z.array(createPackingItemSchema).max(50, 'Max 50 items at once'),
});
