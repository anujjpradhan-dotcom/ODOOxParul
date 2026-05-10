import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors';
import { successResponse, errorResponse } from './utils/response';

const app = express();

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

import { errorHandler } from './middleware';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import routes from './routes';

// API Routes
app.use(requestIdMiddleware);
app.use(routes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  successResponse(res, { status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() }, 'Server is healthy');
});

// 404 handler
app.use((req: Request, res: Response) => {
  errorResponse(res, 'Route not found', 404);
});

// Global error handler
app.use(errorHandler);

export default app;
