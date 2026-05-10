import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';
import { successResponse, paginatedResponse } from '../utils/response';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getDashboardStats();
    return successResponse(res, result, 'Admin stats retrieved successfully');
  } catch (error) { next(error); }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const { data, total } = await adminService.getAllUsers(page, limit, search);
    return paginatedResponse(res, data, total, page, limit, 'Users retrieved successfully');
  } catch (error) { next(error); }
};

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getUserDetails(req.params.userId);
    return successResponse(res, result, 'User details retrieved successfully');
  } catch (error) { next(error); }
};

export const getTripsAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const period = req.query.period as string || 'month';
    const result = await adminService.getTripsAnalytics(period);
    return successResponse(res, result, 'Trips analytics retrieved successfully');
  } catch (error) { next(error); }
};

export const getTopCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const result = await adminService.getTopCities(limit);
    return successResponse(res, result, 'Top cities retrieved successfully');
  } catch (error) { next(error); }
};

export const getTopActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const result = await adminService.getTopActivities(limit);
    return successResponse(res, result, 'Top activities retrieved successfully');
  } catch (error) { next(error); }
};

export const getPlatformMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getPlatformMetrics();
    return successResponse(res, result, 'Platform metrics retrieved successfully');
  } catch (error) { next(error); }
};
