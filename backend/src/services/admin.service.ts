import prisma from '../lib/prisma';
import { AppError } from '../middleware/error.middleware';

export const getDashboardStats = async () => {
  const [totalUsers, totalTrips, activeUsers] = await Promise.all([
    prisma.user.count(),
    prisma.trip.count(),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  const popularCities = await prisma.city.findMany({
    take: 5,
    orderBy: { popularityScore: 'desc' },
  });

  return { totalUsers, totalTrips, activeUsers, popularCities };
};

export const getAllUsers = async (page: number, limit: number, search?: string) => {
  const where = search ? {
    OR: [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
    ],
  } as any : {};

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { data: users, total, page, limit };
};

export const getUserDetails = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: { trips: true },
      },
    },
  });

  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const getTripsAnalytics = async (period: string) => {
  // Simplified analytics
  return { period, data: [] };
};

export const getTopCities = async (limit: number) => {
  return prisma.city.findMany({
    take: limit,
    orderBy: { popularityScore: 'desc' },
  });
};

export const getTopActivities = async (limit: number) => {
  return prisma.activity.findMany({
    take: limit,
    where: { isPopular: true },
  });
};

export const getPlatformMetrics = async () => {
  const [userCount, tripCount, stopCount] = await Promise.all([
    prisma.user.count(),
    prisma.trip.count(),
    prisma.tripStop.count(),
  ]);

  return {
    avgTripsPerUser: userCount > 0 ? tripCount / userCount : 0,
    avgStopsPerTrip: tripCount > 0 ? stopCount / tripCount : 0,
  };
};
