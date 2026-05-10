import { prisma } from '../prisma-client';
import { Prisma, TripStatus } from '@prisma/client';
import { NotFoundError } from '../errors';

export async function createTrip(userId: string, data: Omit<Prisma.TripCreateInput, 'user'>) {
  return prisma.trip.create({
    data: {
      ...data,
      user: { connect: { id: userId } }
    }
  });
}

export async function getTripById(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: { stops: { include: { activities: true, city: true } } }
  });
  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}

export async function getTripsByUserId(userId: string, filters?: Prisma.TripWhereInput) {
  return prisma.trip.findMany({
    where: { userId, ...filters },
    orderBy: { startDate: 'asc' }
  });
}

export async function updateTrip(id: string, data: Prisma.TripUpdateInput) {
  return prisma.trip.update({ where: { id }, data });
}

export async function deleteTrip(id: string) {
  return prisma.trip.delete({ where: { id } });
}

export async function getTripByShareSlug(shareSlug: string) {
  const trip = await prisma.trip.findUnique({ where: { shareSlug } });
  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}

export async function updateTripStatus(id: string, status: TripStatus) {
  return prisma.trip.update({ where: { id }, data: { status } });
}

export async function getTripWithFullDetails(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      stops: {
        include: { city: true, activities: { include: { activity: true } }, expenses: true }
      },
      packingItems: true,
      notes: true
    }
  });
  if (!trip) throw new NotFoundError('Trip not found');
  return trip;
}
