import { z } from 'zod';

const stopBaseSchema = z.object({
  cityId: z.string().cuid('Invalid city ID'),
  arrivalDate: z.string().datetime(),
  departureDate: z.string().datetime(),
  notes: z.string().optional(),
});

export const createStopSchema = stopBaseSchema.refine((data) => new Date(data.departureDate) > new Date(data.arrivalDate), {
  message: "Departure date must be after arrival date",
  path: ["departureDate"],
});

export const updateStopSchema = stopBaseSchema.partial().refine((data) => {
  if (data.arrivalDate && data.departureDate) {
    return new Date(data.departureDate) > new Date(data.arrivalDate);
  }
  return true;
}, {
  message: "Departure date must be after arrival date",
  path: ["departureDate"],
});

export const reorderStopsSchema = z.object({
  orderedStopIds: z.array(z.string().cuid('Invalid stop ID')),
});

export const stopIdParamSchema = z.object({
  id: z.string().cuid('Invalid trip ID'),
  stopId: z.string().cuid('Invalid stop ID').optional(),
});
