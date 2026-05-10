import { Request, Response, NextFunction } from 'express';
import * as activityService from '../services/activity.service';
import { successResponse } from '../utils/response';

export const addActivityToStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params;
    const result = await activityService.addActivityToStop(req.user!.id, tripId, stopId, req.body);
    return successResponse(res, result, 'Activity added to stop successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const removeActivityFromStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId, activityId } = req.params;
    await activityService.removeActivityFromStop(req.user!.id, tripId, stopId, activityId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const reorderActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params;
    const result = await activityService.reorderActivities(req.user!.id, tripId, stopId, req.body.orderedIds);
    return successResponse(res, result, 'Activities reordered successfully', 200);
  } catch (error) {
    next(error);
  }
};
