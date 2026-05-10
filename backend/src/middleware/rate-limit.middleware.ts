import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const limiters = new Map<string, Map<string, { count: number; resetTime: number }>>();

export const createRateLimiter = (name: string, config: RateLimitConfig) => {
  if (!limiters.has(name)) {
    limiters.set(name, new Map());
  }
  const store = limiters.get(name)!;

  // Cleanup interval
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of store.entries()) {
      if (now > data.resetTime) {
        store.delete(ip);
      }
    }
  }, config.windowMs);

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = store.get(ip);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + config.windowMs };
      store.set(ip, record);
      return next();
    }

    record.count++;

    if (record.count > config.maxRequests) {
      return errorResponse(res, 'Too many requests, please try again later.', 429);
    }

    next();
  };
};

export const authLimiter = createRateLimiter('auth', {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5,
});

export const apiLimiter = createRateLimiter('api', {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
});
