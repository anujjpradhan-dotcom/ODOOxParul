import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';

export async function getPackingList(tripId: string) {
  return prisma.packingItem.findMany({ where: { tripId } });
}

export async function addPackingItem(tripId: string, data: Omit<Prisma.PackingItemCreateInput, 'trip'>) {
  return prisma.packingItem.create({
    data: {
      ...data,
      trip: { connect: { id: tripId } }
    }
  });
}

export async function togglePackedStatus(id: string) {
  const item = await prisma.packingItem.findUnique({ where: { id } });
  if (!item) throw new Error('Packing item not found');
  
  return prisma.packingItem.update({
    where: { id },
    data: { isPacked: !item.isPacked }
  });
}

export async function deletePackingItem(id: string) {
  return prisma.packingItem.delete({ where: { id } });
}

export async function resetPackingList(tripId: string) {
  return prisma.packingItem.updateMany({
    where: { tripId },
    data: { isPacked: false }
  });
}

export async function getPackingByCategory(tripId: string) {
  const items = await prisma.packingItem.findMany({ where: { tripId } });
  return items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
}
