import { Router } from 'express';
import { addStop, updateStop, removeStop, reorderStops, getStopDetails } from '../controllers/stop.controller';
import { createStopSchema, updateStopSchema, reorderStopsSchema, stopIdParamSchema } from '../validators/stop.validator';
import { validate, authenticate } from '../middleware';

// We will mount this router on /api/trips/:id/stops, so we mergeParams to get the trip id
const router = Router({ mergeParams: true });

router.post('/', authenticate, validate(stopIdParamSchema, 'params'), validate(createStopSchema, 'body'), addStop);
router.put('/reorder', authenticate, validate(stopIdParamSchema, 'params'), validate(reorderStopsSchema, 'body'), reorderStops);
router.put('/:stopId', authenticate, validate(stopIdParamSchema, 'params'), validate(updateStopSchema, 'body'), updateStop);
router.delete('/:stopId', authenticate, validate(stopIdParamSchema, 'params'), removeStop);
router.get('/:stopId', authenticate, validate(stopIdParamSchema, 'params'), getStopDetails);

export default router;
