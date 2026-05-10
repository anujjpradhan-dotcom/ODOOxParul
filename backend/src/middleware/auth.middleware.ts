import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { errorResponse } from '../utils/response';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required. Missing token.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return errorResponse(res, 'Token expired', 401);
    }
    if (error instanceof JsonWebTokenError) {
      return errorResponse(res, 'Invalid token', 401);
    }
    return errorResponse(res, 'Authentication failed', 401);
  }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.user = decoded;
    }
    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    return errorResponse(res, 'Access denied. Admin privileges required.', 403);
  }
  next();
};
