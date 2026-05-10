import { z } from 'zod';

export const createExpenseSchema = z.object({
  category: z.enum(['TRANSPORT', 'ACCOMMODATION', 'FOOD', 'ACTIVITIES', 'SHOPPING', 'MISCELLANEOUS']),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().optional().default('USD'),
  date: z.string().datetime(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const budgetQuerySchema = z.object({
  tripId: z.string().cuid('Invalid trip ID'),
});
