import { Request, Response, NextFunction } from 'express';
import * as notesService from '../services/notes.service';
import { successResponse } from '../utils/response';

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notesService.getNotesByTrip(req.user!.id, req.params.id);
    return successResponse(res, result, 'Notes retrieved successfully');
  } catch (error) { next(error); }
};

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notesService.createNote(req.user!.id, req.params.id, req.body);
    return successResponse(res, result, 'Note created successfully', 201);
  } catch (error) { next(error); }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notesService.updateNote(req.user!.id, req.params.id, req.params.noteId, req.body);
    return successResponse(res, result, 'Note updated successfully');
  } catch (error) { next(error); }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await notesService.deleteNote(req.user!.id, req.params.id, req.params.noteId);
    return res.status(204).send();
  } catch (error) { next(error); }
};
