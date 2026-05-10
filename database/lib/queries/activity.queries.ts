import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';

export async function getActivitiesByCity(cityId: string, filters?: Prisma.ActivityWhereInput) {
  return prisma.activity.findMany({
    where: { cityId, ...filters },
    orderBy: { isPopular: 'desc' }
  });
}

export async function searchActivities(query: string, filters?: Prisma.ActivityWhereInput) {
  return prisma.activity.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
      ...filters
    }
  });
}

export async function addActivityToStop(tripStopId: string, activityId: string, data?: Partial<Prisma.TripActivityCreateInput>) {
  return prisma.tripActivity.create({
    data: {
      ...data,
      tripStop: { connect: { id: tripStopId } },
      activity: { connect: { id: activityId } }
    }
  });
}

export async function removeActivityFromStop(tripActivityId: string) {
  return prisma.tripActivity.delete({ where: { id: tripActivityId } });
}

export async function reorderActivities(tripStopId: string, orderedIds: string[]) {
  const queries = orderedIds.map((id, index) => 
    prisma.tripActivity.update({
      where: { id },
      data: { orderIndex: index }
    })
  );
  return prisma.$transaction(queries);
}
