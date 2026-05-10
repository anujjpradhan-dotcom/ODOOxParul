import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';

export async function getNotesByTrip(tripId: string) {
  return prisma.tripNote.findMany({
    where: { tripId, tripStopId: null },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getNotesByStop(tripStopId: string) {
  return prisma.tripNote.findMany({
    where: { tripStopId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createNote(data: Prisma.TripNoteCreateInput) {
  return prisma.tripNote.create({ data });
}

export async function updateNote(id: string, data: Prisma.TripNoteUpdateInput) {
  return prisma.tripNote.update({ where: { id }, data });
}

export async function deleteNote(id: string) {
  return prisma.tripNote.delete({ where: { id } });
}
