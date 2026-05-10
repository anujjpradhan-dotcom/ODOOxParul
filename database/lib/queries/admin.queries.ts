import { prisma } from '../prisma-client';

export async function getTotalUsers() {
  return prisma.user.count();
}

export async function getTotalTrips() {
  return prisma.trip.count();
}

export async function getTopCities(limit: number = 10) {
  return prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: limit
  });
}

export async function getTopActivities(limit: number = 10) {
  return prisma.activity.findMany({
    orderBy: { isPopular: 'desc' },
    take: limit
  });
}

export async function getUserEngagementStats() {
  const activeUsers = await prisma.user.count({ where: { isActive: true } });
  const totalTrips = await prisma.trip.count();
  
  return { activeUsers, totalTrips, averageTripsPerUser: totalTrips / (activeUsers || 1) };
}

export async function getTripsCreatedOverTime(period: 'week' | 'month') {
  const date = new Date();
  if (period === 'week') {
    date.setDate(date.getDate() - 7);
  } else {
    date.setMonth(date.getMonth() - 1);
  }
  
  return prisma.trip.count({
    where: { createdAt: { gte: date } }
  });
}

export async function getAllUsers(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  return prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' }
  });
}
