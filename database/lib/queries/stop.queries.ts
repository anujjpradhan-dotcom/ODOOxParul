import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors';

export async function addStopToTrip(tripId: string, cityId: string, data: Omit<Prisma.TripStopCreateInput, 'trip' | 'city'>) {
  return prisma.tripStop.create({
    data: {
      ...data,
      trip: { connect: { id: tripId } },
      city: { connect: { id: cityId } }
    }
  });
}

export async function updateStop(id: string, data: Prisma.TripStopUpdateInput) {
  return prisma.tripStop.update({ where: { id }, data });
}

export async function deleteStop(id: string) {
  return prisma.tripStop.delete({ where: { id } });
}

export async function reorderStops(tripId: string, orderedIds: string[]) {
  const queries = orderedIds.map((id, index) => 
    prisma.tripStop.update({
      where: { id },
      data: { orderIndex: index }
    })
  );
  return prisma.$transaction(queries);
}

export async function getStopWithActivities(id: string) {
  const stop = await prisma.tripStop.findUnique({
    where: { id },
    include: { activities: { include: { activity: true } } }
  });
  if (!stop) throw new NotFoundError('TripStop not found');
  return stop;
}
