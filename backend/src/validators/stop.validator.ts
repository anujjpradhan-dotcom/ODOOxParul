import { z } from 'zod';

const stopBaseSchema = z.object({
  cityId: z.string().min(1, 'Invalid city ID'),
  arrivalDate: z.string().transform((val) => new Date(val).toISOString()),
  departureDate: z.string().transform((val) => new Date(val).toISOString()),
  notes: z.string().optional().nullable().transform(val => val || undefined),
});

export const createStopSchema = stopBaseSchema.refine((data) => new Date(data.departureDate) >= new Date(data.arrivalDate), {
  message: "Departure date must be at or after arrival date",
  path: ["departureDate"],
});

export const updateStopSchema = stopBaseSchema.partial().refine((data) => {
  if (data.arrivalDate && data.departureDate) {
    return new Date(data.departureDate) >= new Date(data.arrivalDate);
  }
  return true;
}, {
  message: "Departure date must be at or after arrival date",
  path: ["departureDate"],
});

export const reorderStopsSchema = z.object({
  orderedStopIds: z.array(z.string().min(1, 'Invalid stop ID')),
});

export const stopIdParamSchema = z.object({
  id: z.string().min(1, 'Invalid trip ID'),
  stopId: z.string().min(1, 'Invalid stop ID').optional(),
});
