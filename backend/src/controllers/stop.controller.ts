import { Request, Response, NextFunction } from 'express';
import * as stopService from '../services/stop.service';
import { successResponse } from '../utils/response';

export const addStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stopService.addStop(req.user!.id, req.params.id, req.body);
    return successResponse(res, result, 'Stop added successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stopService.updateStop(req.user!.id, req.params.id, req.params.stopId, req.body);
    return successResponse(res, result, 'Stop updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const removeStop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await stopService.removeStop(req.user!.id, req.params.id, req.params.stopId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const reorderStops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stopService.reorderStops(req.user!.id, req.params.id, req.body.orderedStopIds);
    return successResponse(res, result, 'Stops reordered successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const getStopDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stopService.getStopDetails(req.user!.id, req.params.id, req.params.stopId);
    return successResponse(res, result, 'Stop details retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};
