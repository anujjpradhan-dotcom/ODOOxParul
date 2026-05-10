import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      languagePreference: true,
      createdAt: true,
    },
  });

  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateProfile = async (userId: string, data: any) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
      languagePreference: data.languagePreference,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      languagePreference: true,
    },
  });

  return user;
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError('User not found', 404);

  const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isPasswordValid) throw new AppError('Current password is incorrect', 400);

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
};

export const deleteAccount = async (userId: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError('User not found', 404);

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new AppError('Password is incorrect', 400);

  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });
};

export const getSavedDestinations = async (userId: string) => {
  const saved = await prisma.savedDestination.findMany({
    where: { userId },
    include: { city: true },
  });
  return saved.map(s => s.city);
};

export const saveDestination = async (userId: string, cityId: string) => {
  const existing = await prisma.savedDestination.findUnique({
    where: { userId_cityId: { userId, cityId } },
  });

  if (existing) return existing;

  return prisma.savedDestination.create({
    data: { userId, cityId },
  });
};

export const removeSavedDestination = async (userId: string, cityId: string) => {
  await prisma.savedDestination.delete({
    where: { userId_cityId: { userId, cityId } },
  });
};

export const getDashboardData = async (userId: string) => {
  const [recentTrips, stats] = await Promise.all([
    prisma.trip.findMany({
      where: { userId },
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.trip.count({ where: { userId } }),
  ]);

  return {
    recentTrips,
    stats: {
      totalTrips: stats,
    },
  };
};
