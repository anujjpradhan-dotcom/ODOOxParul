import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notes.controller';
import { createNoteSchema, updateNoteSchema } from '../validators/notes.validator';
import { validate, authenticate } from '../middleware';

const router = Router({ mergeParams: true }); // /api/trips/:id/notes

router.get('/', authenticate, getNotes);
router.post('/', authenticate, validate(createNoteSchema, 'body'), createNote);
router.put('/:noteId', authenticate, validate(updateNoteSchema, 'body'), updateNote);
router.delete('/:noteId', authenticate, deleteNote);

export default router;
