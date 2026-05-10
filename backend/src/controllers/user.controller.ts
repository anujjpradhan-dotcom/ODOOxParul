import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { successResponse } from '../utils/response';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getProfile(req.user!.id);
    return successResponse(res, result, 'Profile retrieved successfully');
  } catch (error) { next(error); }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateProfile(req.user!.id, req.body);
    return successResponse(res, result, 'Profile updated successfully');
  } catch (error) { next(error); }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.changePassword(req.user!.id, req.body.currentPassword, req.body.newPassword);
    return successResponse(res, null, 'Password changed successfully');
  } catch (error) { next(error); }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteAccount(req.user!.id, req.body.password);
    return res.status(204).send();
  } catch (error) { next(error); }
};

export const getSavedDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getSavedDestinations(req.user!.id);
    return successResponse(res, result, 'Saved destinations retrieved successfully');
  } catch (error) { next(error); }
};

export const saveDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.saveDestination(req.user!.id, req.params.cityId);
    return successResponse(res, result, 'Destination saved successfully', 201);
  } catch (error) { next(error); }
};

export const removeSavedDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.removeSavedDestination(req.user!.id, req.params.cityId);
    return res.status(204).send();
  } catch (error) { next(error); }
};

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getDashboardData(req.user!.id);
    return successResponse(res, result, 'Dashboard data retrieved successfully');
  } catch (error) { next(error); }
};
