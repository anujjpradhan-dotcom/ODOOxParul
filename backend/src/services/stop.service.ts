import { AppError } from '../middleware/error.middleware';
import { getTripById } from './trip.service';

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  arrivalDate: string;
  departureDate: string;
  notes?: string;
  orderIndex: number;
}

const MOCK_DB: { stops: TripStop[] } = { stops: [] };

export const addStop = async (userId: string, tripId: string, data: any) => {
  const trip = await getTripById(userId, tripId);
  
  if (new Date(data.arrivalDate) < new Date(trip.startDate) || new Date(data.departureDate) > new Date(trip.endDate)) {
    throw new AppError('Stop dates must fall within trip start and end dates', 400);
  }

  const tripStops = MOCK_DB.stops.filter(s => s.tripId === tripId);
  const orderIndex = tripStops.length > 0 ? Math.max(...tripStops.map(s => s.orderIndex)) + 1 : 0;

  const stop: TripStop = {
    ...data,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    tripId,
    orderIndex,
  };

  MOCK_DB.stops.push(stop);
  return stop;
};

export const updateStop = async (userId: string, tripId: string, stopId: string, data: any) => {
  const trip = await getTripById(userId, tripId);
  
  const stopIndex = MOCK_DB.stops.findIndex(s => s.id === stopId && s.tripId === tripId);
  if (stopIndex === -1) throw new AppError('Stop not found', 404);

  const updatedStop = { ...MOCK_DB.stops[stopIndex], ...data };

  if (updatedStop.arrivalDate && updatedStop.departureDate) {
    if (new Date(updatedStop.arrivalDate) < new Date(trip.startDate) || new Date(updatedStop.departureDate) > new Date(trip.endDate)) {
      throw new AppError('Stop dates must fall within trip start and end dates', 400);
    }
  }

  MOCK_DB.stops[stopIndex] = updatedStop;
  return updatedStop;
};

export const removeStop = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId); // Validate ownership

  const stopIndex = MOCK_DB.stops.findIndex(s => s.id === stopId && s.tripId === tripId);
  if (stopIndex === -1) throw new AppError('Stop not found', 404);

  MOCK_DB.stops.splice(stopIndex, 1);

  // Reindex remaining stops
  const remainingStops = MOCK_DB.stops.filter(s => s.tripId === tripId).sort((a, b) => a.orderIndex - b.orderIndex);
  remainingStops.forEach((stop, index) => {
    stop.orderIndex = index;
  });
};

export const reorderStops = async (userId: string, tripId: string, orderedIds: string[]) => {
  await getTripById(userId, tripId); // Validate ownership

  const tripStops = MOCK_DB.stops.filter(s => s.tripId === tripId);
  
  // Validate all ids exist
  for (const id of orderedIds) {
    if (!tripStops.find(s => s.id === id)) {
      throw new AppError(`Stop ID ${id} not found in this trip`, 400);
    }
  }

  // Update orderIndex
  orderedIds.forEach((id, index) => {
    const stop = tripStops.find(s => s.id === id);
    if (stop) stop.orderIndex = index;
  });

  return tripStops.sort((a, b) => a.orderIndex - b.orderIndex);
};

export const getStopDetails = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId); // Validate ownership/access

  const stop = MOCK_DB.stops.find(s => s.id === stopId && s.tripId === tripId);
  if (!stop) throw new AppError('Stop not found', 404);

  return {
    ...stop,
    activities: [], // To be populated
    expenses: [],   // To be populated
  };
};
