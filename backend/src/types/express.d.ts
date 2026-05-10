import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
    id?: string; // For request id
  }
}
