import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response';

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signup(req.body);
    return successResponse(res, result, 'Signup successful', 201);
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return successResponse(res, result, 'Login successful', 200);
  } catch (error) {
    next(error);
  }
};

export const postRefresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshTokens(refreshToken);
    return successResponse(res, result, 'Tokens refreshed successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body; // Or get from cookies if used
    await authService.logout(refreshToken);
    return successResponse(res, null, 'Logout successful', 200);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return successResponse(res, req.user, 'Current user', 200);
  } catch (error) {
    next(error);
  }
};
