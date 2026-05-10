import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { PackingCategory } from '@prisma/client';
import { getTripById } from './trip.service';

export const getPackingList = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);
  return prisma.packingItem.findMany({
    where: { tripId },
    orderBy: { createdAt: 'asc' },
  });
};

export const addPackingItem = async (userId: string, tripId: string, data: any) => {
  await getTripById(userId, tripId);
  
  const item = await prisma.packingItem.create({
    data: {
      tripId,
      name: data.name,
      category: data.category as PackingCategory,
      quantity: data.quantity || 1,
      isPacked: false,
    },
  });

  return item;
};

export const bulkAddPackingItems = async (userId: string, tripId: string, items: any[]) => {
  await getTripById(userId, tripId);
  
  const newItems = await prisma.packingItem.createMany({
    data: items.map(item => ({
      tripId,
      name: item.name,
      category: item.category as PackingCategory,
      quantity: item.quantity || 1,
      isPacked: false,
    })),
  });

  return newItems;
};

export const togglePacked = async (userId: string, tripId: string, itemId: string) => {
  await getTripById(userId, tripId);

  const item = await prisma.packingItem.findUnique({ where: { id: itemId } });
  if (!item || item.tripId !== tripId) throw new AppError('Item not found', 404);

  const updatedItem = await prisma.packingItem.update({
    where: { id: itemId },
    data: { isPacked: !item.isPacked },
  });

  return updatedItem;
};

export const deletePackingItem = async (userId: string, tripId: string, itemId: string) => {
  await getTripById(userId, tripId);

  const item = await prisma.packingItem.findUnique({ where: { id: itemId } });
  if (!item || item.tripId !== tripId) throw new AppError('Item not found', 404);

  await prisma.packingItem.delete({ where: { id: itemId } });
};

export const resetPackingList = async (userId: string, tripId: string) => {
  await getTripById(userId, tripId);

  await prisma.packingItem.updateMany({
    where: { tripId },
    data: { isPacked: false },
  });
};

export const getPackingSuggestions = async (tripId: string) => {
  // Simple rule-based suggestions
  return [
    { name: 'Passport', category: PackingCategory.DOCUMENTS, quantity: 1 },
    { name: 'Phone Charger', category: PackingCategory.ELECTRONICS, quantity: 1 },
    { name: 'Sunscreen', category: PackingCategory.TOILETRIES, quantity: 1 },
    { name: 'Underwear', category: PackingCategory.CLOTHING, quantity: 7 },
  ];
};
