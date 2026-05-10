import { AppError } from '../middleware/error.middleware';
import { getTripById } from './trip.service';

export interface Activity {
  id: string;
  cityId: string;
  name: string;
  category: 'SIGHTSEEING' | 'FOOD' | 'ADVENTURE' | 'NIGHTLIFE' | 'CULTURE' | 'RELAXATION' | 'OTHER';
  cost: number;
  durationMinutes: number;
}

const MOCK_ACTIVITIES: Activity[] = [
  { id: 'cuid_act1', cityId: 'cuid_tokyo', name: 'Tokyo Tower', category: 'SIGHTSEEING', cost: 20, durationMinutes: 120 },
];

const MOCK_TRIP_ACTIVITIES: any[] = [];

export const searchActivities = async (filters: any) => {
  let results = [...MOCK_ACTIVITIES];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(a => a.name.toLowerCase().includes(q));
  }
  if (filters.cityId) results = results.filter(a => a.cityId === filters.cityId);
  if (filters.category) results = results.filter(a => a.category === filters.category);
  if (filters.minCost) results = results.filter(a => a.cost >= filters.minCost);
  if (filters.maxCost) results = results.filter(a => a.cost <= filters.maxCost);

  const total = results.length;
  const skip = (filters.page - 1) * filters.limit;
  const data = results.slice(skip, skip + filters.limit);

  return { data, total, page: filters.page, limit: filters.limit };
};

export const getActivitiesByCity = async (cityId: string, filters: any) => {
  return searchActivities({ ...filters, cityId });
};

export const addActivityToStop = async (userId: string, tripId: string, stopId: string, data: any) => {
  await getTripById(userId, tripId); // Validate ownership
  
  const tripStopsActivities = MOCK_TRIP_ACTIVITIES.filter(a => a.stopId === stopId);
  const orderIndex = tripStopsActivities.length > 0 ? Math.max(...tripStopsActivities.map(a => a.orderIndex)) + 1 : 0;

  const tripActivity = {
    ...data,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    tripId,
    stopId,
    orderIndex,
  };

  MOCK_TRIP_ACTIVITIES.push(tripActivity);
  return tripActivity;
};

export const removeActivityFromStop = async (userId: string, tripId: string, stopId: string, tripActivityId: string) => {
  await getTripById(userId, tripId);

  const index = MOCK_TRIP_ACTIVITIES.findIndex(a => a.id === tripActivityId && a.stopId === stopId);
  if (index === -1) throw new AppError('Trip activity not found', 404);

  MOCK_TRIP_ACTIVITIES.splice(index, 1);
};

export const reorderActivities = async (userId: string, tripId: string, stopId: string, orderedIds: string[]) => {
  await getTripById(userId, tripId);

  const stopActivities = MOCK_TRIP_ACTIVITIES.filter(a => a.stopId === stopId);
  
  for (const id of orderedIds) {
    if (!stopActivities.find(a => a.id === id)) {
      throw new AppError(`Trip Activity ID ${id} not found in this stop`, 400);
    }
  }

  orderedIds.forEach((id, index) => {
    const act = stopActivities.find(a => a.id === id);
    if (act) act.orderIndex = index;
  });

  return stopActivities.sort((a, b) => a.orderIndex - b.orderIndex);
};
