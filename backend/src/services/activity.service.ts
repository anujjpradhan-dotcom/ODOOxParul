import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { ActivityCategory, Prisma } from '@prisma/client';
import { getTripById } from './trip.service';

export const searchActivities = async (filters: any) => {
  const where: Prisma.ActivityWhereInput = {};

  if (filters.query) {
    where.name = { contains: filters.query, mode: 'insensitive' };
  }
  if (filters.cityId) where.cityId = filters.cityId;
  if (filters.category) where.category = filters.category as ActivityCategory;
  
  if (filters.minCost) where.estimatedCost = { gte: Number(filters.minCost) };
  if (filters.maxCost) {
    const costFilter = (where.estimatedCost as any) || {};
    where.estimatedCost = { ...costFilter, lte: Number(filters.maxCost) };
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      skip,
      take: limit,
      orderBy: { isPopular: 'desc' },
    }),
    prisma.activity.count({ where }),
  ]);

  return { data: activities, total, page, limit };
};

export const getActivitiesByCity = async (cityId: string, filters: any) => {
  return searchActivities({ ...filters, cityId });
};

export const addActivityToStop = async (userId: string, tripId: string, stopId: string, data: any) => {
  await getTripById(userId, tripId); // Validate ownership
  
  const lastActivity = await prisma.tripActivity.findFirst({
    where: { tripStopId: stopId },
    orderBy: { orderIndex: 'desc' },
  });

  const orderIndex = lastActivity ? lastActivity.orderIndex + 1 : 0;

  const tripActivity = await prisma.tripActivity.create({
    data: {
      tripStopId: stopId,
      activityId: data.activityId,
      customCost: data.customCost,
      notes: data.notes,
      orderIndex,
    },
    include: {
      activity: true,
    },
  });

  return tripActivity;
};

export const removeActivityFromStop = async (userId: string, tripId: string, stopId: string, tripActivityId: string) => {
  await getTripById(userId, tripId);

  const tripActivity = await prisma.tripActivity.findUnique({
    where: { id: tripActivityId },
  });

  if (!tripActivity || tripActivity.tripStopId !== stopId) {
    throw new AppError('Trip activity not found', 404);
  }

  await prisma.tripActivity.delete({ where: { id: tripActivityId } });
};

export const reorderActivities = async (userId: string, tripId: string, stopId: string, orderedIds: string[]) => {
  await getTripById(userId, tripId);

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < orderedIds.length; i++) {
      await tx.tripActivity.update({
        where: { id: orderedIds[i], tripStopId: stopId },
        data: { orderIndex: i },
      });
    }
  });

  return prisma.tripActivity.findMany({
    where: { tripStopId: stopId },
    orderBy: { orderIndex: 'asc' },
    include: { activity: true },
  });
};
