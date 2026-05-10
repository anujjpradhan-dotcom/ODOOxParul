import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors';

export async function searchCities(query: string, filters?: Prisma.CityWhereInput) {
  return prisma.city.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
      ...filters
    },
    orderBy: { popularityScore: 'desc' }
  });
}

export async function getCityById(id: string) {
  const city = await prisma.city.findUnique({ where: { id } });
  if (!city) throw new NotFoundError('City not found');
  return city;
}

export async function getCitiesByRegion(region: string) {
  return prisma.city.findMany({
    where: { region },
    orderBy: { popularityScore: 'desc' }
  });
}

export async function getPopularCities(limit: number = 10) {
  return prisma.city.findMany({
    orderBy: { popularityScore: 'desc' },
    take: limit
  });
}

export async function getCityWithActivities(id: string) {
  const city = await prisma.city.findUnique({
    where: { id },
    include: { activities: true }
  });
  if (!city) throw new NotFoundError('City not found');
  return city;
}
