import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AccessTokenPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface RefreshTokenPayload {
  id: string;
}

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRY,
  });
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
};
