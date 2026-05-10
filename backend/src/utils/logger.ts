import { env } from '../config/env';

export const logger = {
  info: (message: string, context?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, context ? context : '');
  },
  warn: (message: string, context?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, context ? context : '');
  },
  error: (message: string, context?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, context ? context : '');
  },
  debug: (message: string, context?: any) => {
    if (env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, context ? context : '');
    }
  },
};
