import { Router } from 'express';
import { searchActivities, getActivitiesByCity } from '../controllers/search.controller';
import { addActivityToStop, removeActivityFromStop, reorderActivities } from '../controllers/activity.controller';
import { activitySearchSchema, addActivityToStopSchema } from '../validators/search.validator';
import { validate, authenticate } from '../middleware';

const router = Router();
const tripActivityRouter = Router({ mergeParams: true }); // /api/trips/:id/stops/:stopId/activities

// Main activity routes
router.get('/', validate(activitySearchSchema, 'query'), searchActivities);

// Trip activity routes (nested under trips/:id/stops/:stopId/activities)
tripActivityRouter.post('/', authenticate, validate(addActivityToStopSchema, 'body'), addActivityToStop);
tripActivityRouter.delete('/:activityId', authenticate, removeActivityFromStop);
tripActivityRouter.put('/reorder', authenticate, reorderActivities);

export { router as activityRouter, tripActivityRouter };
