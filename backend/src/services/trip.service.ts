import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { TripStatus, Prisma } from '@prisma/client';

export const generateShareSlug = () => Math.random().toString(36).substring(2, 10);

export const createTrip = async (userId: string, data: any) => {
  const userTripsCount = await prisma.trip.count({ where: { userId } });
  if (userTripsCount >= 50) {
    throw new AppError('Maximum trips limit reached (50)', 400);
  }

  const trip = await prisma.trip.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      coverImageUrl: data.coverImageUrl,
      totalBudget: data.totalBudget || data.budgetLimit,
      isPublic: data.isPublic || false,
      userId,
      status: TripStatus.DRAFT,
      shareSlug: data.isPublic ? generateShareSlug() : undefined,
    },
  });

  return { ...trip, stopsCount: 0 };
};

export const getTrips = async (userId: string, filters: any) => {
  const where: Prisma.TripWhereInput = { userId };
  
  if (filters.status) {
    where.status = filters.status as TripStatus;
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  let orderBy: Prisma.TripOrderByWithRelationInput = { createdAt: 'desc' };
  
  if (filters.sortBy === 'date') {
    orderBy = { startDate: 'asc' };
  } else if (filters.sortBy === 'name') {
    orderBy = { name: 'asc' };
  }

  const [trips, total] = await Promise.all([
    prisma.trip.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        _count: {
          select: { stops: true }
        }
      }
    }),
    prisma.trip.count({ where }),
  ]);

  const formattedTrips = trips.map(trip => ({
    ...trip,
    stopsCount: trip._count.stops,
    _count: undefined
  }));

  return { data: formattedTrips, total, page, limit };
};

export const getTripById = async (userId: string, tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      _count: {
        select: { stops: true }
      }
    }
  });

  if (!trip) throw new AppError('Trip not found', 404);
  
  if (trip.userId !== userId && !trip.isPublic) {
    throw new AppError('Unauthorized', 403);
  }
  
  return {
    ...trip,
    stopsCount: trip._count.stops,
    _count: undefined
  };
};

export const updateTrip = async (userId: string, tripId: string, data: any) => {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  
  if (!trip) throw new AppError('Trip not found', 404);
  if (trip.userId !== userId) throw new AppError('Unauthorized', 403);

  const updateData: Prisma.TripUpdateInput = {
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    totalBudget: data.totalBudget !== undefined ? data.totalBudget : (data.budgetLimit !== undefined ? data.budgetLimit : undefined),
  };

  // Remove budgetLimit if it exists to avoid Prisma errors if it's not in the schema
  if ('budgetLimit' in updateData) {
    delete (updateData as any).budgetLimit;
  }

  if (data.isPublic && !trip.shareSlug && !data.shareSlug) {
    updateData.shareSlug = generateShareSlug();
  }

  const updatedTrip = await prisma.trip.update({
    where: { id: tripId },
    data: updateData,
    include: {
      _count: {
        select: { stops: true }
      }
    }
  });

  return {
    ...updatedTrip,
    stopsCount: updatedTrip._count.stops,
    _count: undefined
  };
};

export const deleteTrip = async (userId: string, tripId: string) => {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  
  if (!trip) throw new AppError('Trip not found', 404);
  if (trip.userId !== userId) throw new AppError('Unauthorized', 403);

  await prisma.trip.delete({ where: { id: tripId } });
};

export const getTripPublic = async (shareSlug: string) => {
  const trip = await prisma.trip.findUnique({
    where: { shareSlug, isPublic: true },
    include: {
      _count: {
        select: { stops: true }
      }
    }
  });

  if (!trip) throw new AppError('Trip not found or not public', 404);
  return {
    ...trip,
    stopsCount: trip._count.stops,
    _count: undefined
  };
};

export const duplicateTrip = async (userId: string, tripId: string) => {
  const tripToCopy = await getTripById(userId, tripId);
  
  const newTrip = await prisma.trip.create({
    data: {
      name: `Copy of ${tripToCopy.name}`,
      description: tripToCopy.description,
      startDate: tripToCopy.startDate,
      endDate: tripToCopy.endDate,
      coverImageUrl: tripToCopy.coverImageUrl,
      totalBudget: tripToCopy.totalBudget,
      isPublic: false,
      userId,
      status: TripStatus.DRAFT,
    },
  });

  return { ...newTrip, stopsCount: 0 };
};
