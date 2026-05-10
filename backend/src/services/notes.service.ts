import { AppError } from '../middleware/error.middleware';
import { getTripById } from './trip.service';

export interface Note {
  id: string;
  tripId: string;
  tripStopId?: string;
  title?: string;
  content: string;
  createdAt: string;
}

const MOCK_NOTES: Note[] = [];

export const getNotesByTrip = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);
  return MOCK_NOTES.filter(n => n.tripId === tripId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getNotesByStop = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId);
  return MOCK_NOTES.filter(n => n.tripId === tripId && n.tripStopId === stopId);
};

export const createNote = async (userId: string, tripId: string, data: any) => {
  await getTripById(userId, tripId);
  const note = { ...data, id: 'cuid_' + Math.random().toString(36).substring(7), tripId, createdAt: new Date().toISOString() };
  MOCK_NOTES.push(note);
  return note;
};

export const updateNote = async (userId: string, tripId: string, noteId: string, data: any) => {
  await getTripById(userId, tripId);
  const index = MOCK_NOTES.findIndex(n => n.id === noteId && n.tripId === tripId);
  if (index === -1) throw new AppError('Note not found', 404);
  const updatedNote = { ...MOCK_NOTES[index], ...data };
  MOCK_NOTES[index] = updatedNote;
  return updatedNote;
};

export const deleteNote = async (userId: string, tripId: string, noteId: string) => {
  await getTripById(userId, tripId);
  const index = MOCK_NOTES.findIndex(n => n.id === noteId && n.tripId === tripId);
  if (index === -1) throw new AppError('Note not found', 404);
  MOCK_NOTES.splice(index, 1);
};
