import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { errorResponse } from '../utils/response';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { stack: env.NODE_ENV === 'development' ? err.stack : undefined });

  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  if (err instanceof ZodError) {
    return errorResponse(res, 'Validation error', 400, err.format());
  }

  if (err instanceof TokenExpiredError) {
    return errorResponse(res, 'Token expired', 401);
  }

  if (err instanceof JsonWebTokenError) {
    return errorResponse(res, 'Invalid token', 401);
  }

  const message = env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';
  return errorResponse(res, message, 500);
};
