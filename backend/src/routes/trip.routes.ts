import { Router } from 'express';
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip, getPublicTrip, duplicateTrip } from '../controllers/trip.controller';
import { createTripSchema, updateTripSchema, tripIdParamSchema, tripListQuerySchema } from '../validators/trip.validator';
import { validate, authenticate, optionalAuth } from '../middleware';

const router = Router();
const publicRouter = Router();

router.post('/', authenticate, validate(createTripSchema, 'body'), createTrip);
router.get('/', authenticate, validate(tripListQuerySchema, 'query'), getTrips);
router.get('/:id', authenticate, validate(tripIdParamSchema, 'params'), getTripById);
router.put('/:id', authenticate, validate(tripIdParamSchema, 'params'), validate(updateTripSchema, 'body'), updateTrip);
router.delete('/:id', authenticate, validate(tripIdParamSchema, 'params'), deleteTrip);
router.post('/:id/duplicate', authenticate, validate(tripIdParamSchema, 'params'), duplicateTrip);

publicRouter.get('/:slug', optionalAuth, getPublicTrip);

export { router as tripRouter, publicRouter as publicTripRouter };
