import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { getTripById } from './trip.service';

export const getStopsByTrip = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId); // Ownership check

  return prisma.tripStop.findMany({
    where: { tripId },
    orderBy: { orderIndex: 'asc' },
    include: {
      city: true,
      activities: {
        include: { activity: true },
        orderBy: { orderIndex: 'asc' },
      },
    },
  });
};

export const addStop = async (userId: string, tripId: string, data: any) => {
  const trip = await getTripById(userId, tripId);
  
  const arrivalDate = new Date(data.arrivalDate);
  const departureDate = new Date(data.departureDate);

  if (arrivalDate < trip.startDate || departureDate > trip.endDate) {
    throw new AppError('Stop dates must fall within trip start and end dates', 400);
  }

  const lastStop = await prisma.tripStop.findFirst({
    where: { tripId },
    orderBy: { orderIndex: 'desc' },
  });

  const orderIndex = lastStop ? lastStop.orderIndex + 1 : 0;

  const stop = await prisma.tripStop.create({
    data: {
      tripId,
      cityId: data.cityId,
      arrivalDate,
      departureDate,
      notes: data.notes,
      orderIndex,
    },
    include: {
      city: true,
    },
  });

  return stop;
};

export const updateStop = async (userId: string, tripId: string, stopId: string, data: any) => {
  const trip = await getTripById(userId, tripId);
  
  const stop = await prisma.tripStop.findUnique({ where: { id: stopId } });
  if (!stop || stop.tripId !== tripId) throw new AppError('Stop not found', 404);

  const arrivalDate = data.arrivalDate ? new Date(data.arrivalDate) : stop.arrivalDate;
  const departureDate = data.departureDate ? new Date(data.departureDate) : stop.departureDate;

  if (arrivalDate < trip.startDate || departureDate > trip.endDate) {
    throw new AppError('Stop dates must fall within trip start and end dates', 400);
  }

  const updatedStop = await prisma.tripStop.update({
    where: { id: stopId },
    data: {
      ...data,
      arrivalDate,
      departureDate,
    },
    include: {
      city: true,
    },
  });

  return updatedStop;
};

export const removeStop = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId); // Validate ownership

  const stop = await prisma.tripStop.findUnique({ where: { id: stopId } });
  if (!stop || stop.tripId !== tripId) throw new AppError('Stop not found', 404);

  await prisma.$transaction(async (tx) => {
    await tx.tripStop.delete({ where: { id: stopId } });

    // Reindex remaining stops
    const remainingStops = await tx.tripStop.findMany({
      where: { tripId },
      orderBy: { orderIndex: 'asc' },
    });

    for (let i = 0; i < remainingStops.length; i++) {
      await tx.tripStop.update({
        where: { id: remainingStops[i].id },
        data: { orderIndex: i },
      });
    }
  });
};

export const reorderStops = async (userId: string, tripId: string, orderedIds: string[]) => {
  await getTripById(userId, tripId); // Validate ownership

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < orderedIds.length; i++) {
      await tx.tripStop.update({
        where: { id: orderedIds[i], tripId },
        data: { orderIndex: i },
      });
    }
  });

  return prisma.tripStop.findMany({
    where: { tripId },
    orderBy: { orderIndex: 'asc' },
    include: { city: true },
  });
};

export const getStopDetails = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId); // Validate ownership/access

  const stop = await prisma.tripStop.findUnique({
    where: { id: stopId, tripId },
    include: {
      city: true,
      activities: {
        include: { activity: true },
        orderBy: { orderIndex: 'asc' },
      },
      expenses: {
        orderBy: { date: 'desc' },
      },
    },
  });

  if (!stop) throw new AppError('Stop not found', 404);

  return stop;
};
