import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().min(1, 'Content is required').max(5000),
  tripStopId: z.string().cuid('Invalid stop ID').optional(),
});

export const updateNoteSchema = createNoteSchema.partial();
