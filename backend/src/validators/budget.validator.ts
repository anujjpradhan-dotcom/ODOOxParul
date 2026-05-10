import { z } from 'zod';

export const createExpenseSchema = z.object({
  category: z.enum(['TRANSPORT', 'ACCOMMODATION', 'FOOD', 'ACTIVITY', 'SHOPPING', 'MISCELLANEOUS']),
  description: z.string().min(1, 'Description is required').trim(),
  amount: z.coerce.number().positive('Amount must be positive'),
  currency: z.string().optional().default('USD'),
  date: z.string().transform((val) => new Date(val).toISOString()),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const budgetQuerySchema = z.object({
  tripId: z.string().min(1, 'Invalid trip ID'),
});
