import { AppError } from '../middleware/error.middleware';
import { getTripById } from './trip.service';

export interface PackingItem {
  id: string;
  tripId: string;
  name: string;
  category: string;
  quantity: number;
  isPacked: boolean;
}

const MOCK_PACKING_ITEMS: PackingItem[] = [];

export const getPackingList = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);
  return MOCK_PACKING_ITEMS.filter(i => i.tripId === tripId);
};

export const addPackingItem = async (userId: string, tripId: string, data: any) => {
  await getTripById(userId, tripId);
  const item = { ...data, id: 'cuid_' + Math.random().toString(36).substring(7), tripId, isPacked: false };
  MOCK_PACKING_ITEMS.push(item);
  return item;
};

export const bulkAddPackingItems = async (userId: string, tripId: string, items: any[]) => {
  await getTripById(userId, tripId);
  const newItems = items.map(data => ({
    ...data,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    tripId,
    isPacked: false,
  }));
  MOCK_PACKING_ITEMS.push(...newItems);
  return newItems;
};

export const togglePacked = async (userId: string, tripId: string, itemId: string) => {
  await getTripById(userId, tripId);
  const item = MOCK_PACKING_ITEMS.find(i => i.id === itemId && i.tripId === tripId);
  if (!item) throw new AppError('Item not found', 404);
  item.isPacked = !item.isPacked;
  return item;
};

export const deletePackingItem = async (userId: string, tripId: string, itemId: string) => {
  await getTripById(userId, tripId);
  const index = MOCK_PACKING_ITEMS.findIndex(i => i.id === itemId && i.tripId === tripId);
  if (index === -1) throw new AppError('Item not found', 404);
  MOCK_PACKING_ITEMS.splice(index, 1);
};

export const resetPackingList = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);
  MOCK_PACKING_ITEMS.filter(i => i.tripId === tripId).forEach(i => i.isPacked = false);
};

export const getPackingSuggestions = async (tripId: string) => {
  // Mock suggestions based on rules
  return [
    { name: 'Passport', category: 'DOCUMENTS', quantity: 1 },
    { name: 'Phone Charger', category: 'ELECTRONICS', quantity: 1 },
  ];
};
