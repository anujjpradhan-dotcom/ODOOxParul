import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.headers['x-request-id'] as string || uuidv4();
  req.id = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
};
