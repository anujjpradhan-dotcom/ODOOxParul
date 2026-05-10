import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { AppError } from '../middleware/error.middleware';

// Mock DB interactions for now since database package is not present
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  city?: string;
  phone?: string;
}

export type SafeUser = Omit<User, 'passwordHash'>;

const MOCK_DB: { users: User[]; refreshTokens: Map<string, string> } = {
  users: [],
  refreshTokens: new Map(), // userId -> refreshToken
};

export const signup = async (data: any) => {
  const existingUser = MOCK_DB.users.find((u) => u.email === data.email);
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const newUser: User = {
    id: Math.random().toString(36).substring(7),
    email: data.email,
    passwordHash,
    firstName: data.firstName,
    lastName: data.lastName,
    isAdmin: false,
    city: data.city,
    phone: data.phone,
  };

  MOCK_DB.users.push(newUser);

  const accessToken = generateAccessToken({ id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin });
  const refreshToken = generateRefreshToken({ id: newUser.id });

  MOCK_DB.refreshTokens.set(newUser.id, refreshToken);

  const { passwordHash: _, ...safeUser } = newUser;
  return { user: safeUser, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = MOCK_DB.users.find((u) => u.email === email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const accessToken = generateAccessToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });
  const refreshToken = generateRefreshToken({ id: user.id });

  MOCK_DB.refreshTokens.set(user.id, refreshToken);

  const { passwordHash: _, ...safeUser } = user;
  return { user: safeUser, accessToken, refreshToken };
};

export const refreshTokens = async (token: string) => {
  // Normally we would verify the token with verifyRefreshToken from jwt.ts
  // and check if it exists in DB. Let's do a basic mock check.
  let userId: string | null = null;
  for (const [id, rt] of MOCK_DB.refreshTokens.entries()) {
    if (rt === token) {
      userId = id;
      break;
    }
  }

  if (!userId) {
    throw new AppError('Invalid refresh token', 401);
  }

  const user = MOCK_DB.users.find((u) => u.id === userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const newAccessToken = generateAccessToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });
  const newRefreshToken = generateRefreshToken({ id: user.id });

  MOCK_DB.refreshTokens.set(user.id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logout = async (refreshToken: string) => {
  for (const [id, rt] of MOCK_DB.refreshTokens.entries()) {
    if (rt === refreshToken) {
      MOCK_DB.refreshTokens.delete(id);
      break;
    }
  }
};
