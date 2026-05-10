import { AppError } from '../middleware/error.middleware';

// Mock DB
export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  coverImageUrl?: string;
  totalBudget?: number;
  isPublic: boolean;
  status: 'DRAFT' | 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  shareSlug?: string;
  createdAt: string;
}

const MOCK_DB: { trips: Trip[] } = { trips: [] };

export const generateShareSlug = () => Math.random().toString(36).substring(2, 10);

export const createTrip = async (userId: string, data: any) => {
  const userTripsCount = MOCK_DB.trips.filter(t => t.userId === userId).length;
  if (userTripsCount >= 50) {
    throw new AppError('Maximum trips limit reached (50)', 400);
  }

  const trip: Trip = {
    ...data,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    userId,
    status: 'DRAFT',
    shareSlug: data.isPublic ? generateShareSlug() : undefined,
    createdAt: new Date().toISOString(),
  };

  MOCK_DB.trips.push(trip);
  return trip;
};

export const getTrips = async (userId: string, filters: any) => {
  let userTrips = MOCK_DB.trips.filter(t => t.userId === userId);
  
  if (filters.status) {
    userTrips = userTrips.filter(t => t.status === filters.status);
  }

  // Sort
  if (filters.sortBy === 'date') {
    userTrips.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  } else if (filters.sortBy === 'name') {
    userTrips.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    userTrips.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const total = userTrips.length;
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;
  const data = userTrips.slice(skip, skip + limit);

  return { data, total, page, limit };
};

export const getTripById = async (userId: string, tripId: string) => {
  const trip = MOCK_DB.trips.find(t => t.id === tripId);
  if (!trip) throw new AppError('Trip not found', 404);
  if (trip.userId !== userId && !trip.isPublic) {
    throw new AppError('Unauthorized', 403);
  }
  return trip;
};

export const updateTrip = async (userId: string, tripId: string, data: any) => {
  const tripIndex = MOCK_DB.trips.findIndex(t => t.id === tripId);
  if (tripIndex === -1) throw new AppError('Trip not found', 404);
  
  const trip = MOCK_DB.trips[tripIndex];
  if (trip.userId !== userId) throw new AppError('Unauthorized', 403);

  const updatedTrip = { ...trip, ...data };
  if (updatedTrip.isPublic && !updatedTrip.shareSlug) {
    updatedTrip.shareSlug = generateShareSlug();
  }

  MOCK_DB.trips[tripIndex] = updatedTrip;
  return updatedTrip;
};

export const deleteTrip = async (userId: string, tripId: string) => {
  const tripIndex = MOCK_DB.trips.findIndex(t => t.id === tripId);
  if (tripIndex === -1) throw new AppError('Trip not found', 404);
  
  const trip = MOCK_DB.trips[tripIndex];
  if (trip.userId !== userId) throw new AppError('Unauthorized', 403);

  // Soft delete representation (for now hard delete from mock)
  MOCK_DB.trips.splice(tripIndex, 1);
};

export const getTripPublic = async (shareSlug: string) => {
  const trip = MOCK_DB.trips.find(t => t.shareSlug === shareSlug && t.isPublic);
  if (!trip) throw new AppError('Trip not found or not public', 404);
  return trip;
};

export const duplicateTrip = async (userId: string, tripId: string) => {
  const tripToCopy = await getTripById(userId, tripId);
  
  const newTrip: Trip = {
    ...tripToCopy,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    userId,
    name: `Copy of ${tripToCopy.name}`,
    isPublic: false,
    shareSlug: undefined,
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
  };

  MOCK_DB.trips.push(newTrip);
  return newTrip;
};
