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
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);

  const [totalTrips, upcomingTrips, totalSpent, totalPlannedBudget, completedTrips] = await Promise.all([
    prisma.trip.count({ where: { userId } }),
    prisma.trip.findMany({
      where: { userId, status: 'PLANNED' },
      take: 3,
      orderBy: { startDate: 'asc' },
      include: {
        _count: { select: { stops: true } }
      }
    }),
    prisma.expense.aggregate({
      where: { 
        trip: { userId },
        createdAt: { gte: startOfYear }
      },
      _sum: { amount: true },
    }),
    prisma.trip.aggregate({
      where: { userId, status: 'PLANNED' },
      _sum: { totalBudget: true },
    }),
    prisma.trip.findMany({
      where: { userId, status: 'COMPLETED' },
      select: { startDate: true, endDate: true }
    })
  ]);

  // Calculate Avg Daily Cost
  let totalDays = 0;
  completedTrips.forEach(t => {
    const diff = Math.ceil((t.endDate.getTime() - t.startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    totalDays += diff;
  });

  const avgDailyCost = totalDays > 0 ? (totalSpent._sum.amount || 0) / totalDays : 0;

  return {
    stats: {
      totalTrips,
      totalSpentYear: totalSpent._sum.amount || 0,
      upcomingBudget: totalPlannedBudget._sum.totalBudget || 0,
      avgDailyCost,
    },
    upcomingTrips: upcomingTrips.map(t => ({
      ...t,
      stopsCount: t._count.stops,
      _count: undefined
    })),
  };
};
