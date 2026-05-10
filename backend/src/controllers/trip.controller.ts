import { Request, Response, NextFunction } from 'express';
import * as tripService from '../services/trip.service';
import { successResponse, paginatedResponse } from '../utils/response';

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.createTrip(req.user!.id, req.body);
    return successResponse(res, result, 'Trip created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, total, page, limit } = await tripService.getTrips(req.user!.id, req.query);
    return paginatedResponse(res, data, total, page, limit, 'Trips retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.getTripById(req.user!.id, req.params.id);
    return successResponse(res, result, 'Trip retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.updateTrip(req.user!.id, req.params.id, req.body);
    return successResponse(res, result, 'Trip updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tripService.deleteTrip(req.user!.id, req.params.id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getPublicTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.getTripPublic(req.params.slug);
    return successResponse(res, result, 'Public trip retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const duplicateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.duplicateTrip(req.user!.id, req.params.id);
    return successResponse(res, result, 'Trip duplicated successfully', 201);
  } catch (error) {
    next(error);
  }
};
