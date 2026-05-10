import { Request, Response, NextFunction } from 'express';
import * as cityService from '../services/city.service';
import * as activityService from '../services/activity.service';
import { successResponse, paginatedResponse } from '../utils/response';

export const searchCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, total, page, limit } = await cityService.searchCities(req.query);
    return paginatedResponse(res, data, total, page, limit, 'Cities retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getCityDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await cityService.getCityDetails(req.params.id);
    return successResponse(res, result, 'City details retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const getPopularCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const result = await cityService.getPopularCities(limit);
    return successResponse(res, result, 'Popular cities retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const getRecommendedCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await cityService.getRecommendedCities(req.user!.id);
    return successResponse(res, result, 'Recommended cities retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const searchActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, total, page, limit } = await activityService.searchActivities(req.query);
    return paginatedResponse(res, data, total, page, limit, 'Activities retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getActivitiesByCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, total, page, limit } = await activityService.getActivitiesByCity(req.params.cityId, req.query);
    return paginatedResponse(res, data, total, page, limit, 'Activities retrieved successfully');
  } catch (error) {
    next(error);
  }
};
