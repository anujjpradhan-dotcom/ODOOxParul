import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().max(200).optional().nullable().transform(v => v || undefined),
  content: z.string().min(1, 'Content is required').max(5000).trim(),
  tripStopId: z.string().min(1, 'Invalid stop ID').optional().nullable().transform(v => v || undefined),
});

export const updateNoteSchema = createNoteSchema.partial();
