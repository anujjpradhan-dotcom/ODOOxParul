import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { getTripById } from './trip.service';

export const getNotesByTrip = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);
  return prisma.tripNote.findMany({
    where: { tripId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getNotesByStop = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId);
  return prisma.tripNote.findMany({
    where: { tripId, tripStopId: stopId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createNote = async (userId: string, tripId: string, data: any) => {
  await getTripById(userId, tripId);
  
  const note = await prisma.tripNote.create({
    data: {
      tripId,
      tripStopId: data.tripStopId,
      title: data.title,
      content: data.content,
    },
  });

  return note;
};

export const updateNote = async (userId: string, tripId: string, noteId: string, data: any) => {
  await getTripById(userId, tripId);

  const note = await prisma.tripNote.findUnique({ where: { id: noteId } });
  if (!note || note.tripId !== tripId) throw new AppError('Note not found', 404);

  const updatedNote = await prisma.tripNote.update({
    where: { id: noteId },
    data: {
      title: data.title,
      content: data.content,
      tripStopId: data.tripStopId,
    },
  });

  return updatedNote;
};

export const deleteNote = async (userId: string, tripId: string, noteId: string) => {
  await getTripById(userId, tripId);

  const note = await prisma.tripNote.findUnique({ where: { id: noteId } });
  if (!note || note.tripId !== tripId) throw new AppError('Note not found', 404);

  await prisma.tripNote.delete({ where: { id: noteId } });
};
