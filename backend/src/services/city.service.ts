import prisma from '../lib/prisma';
import { CostLevel, Prisma } from '@prisma/client';

const mapCostLevel = (level: CostLevel): number => {
  switch (level) {
    case CostLevel.BUDGET: return 1;
    case CostLevel.MODERATE: return 2;
    case CostLevel.EXPENSIVE: return 3;
    case CostLevel.LUXURY: return 4;
    default: return 1;
  }
};

const formatCity = (city: any) => {
  if (!city) return null;
  return {
    ...city,
    costLevel: mapCostLevel(city.costIndex),
    popularity: city.popularityScore / 20, // scale to 0-5 if stored as 0-100
  };
};

export const searchCities = async (filters: any) => {
  const where: Prisma.CityWhereInput = {};

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: 'insensitive' } },
      { country: { contains: filters.q, mode: 'insensitive' } },
    ];
  }

  if (filters.region) where.region = filters.region;
  if (filters.costLevel) {
    // Reverse mapping if needed, or just skip if complex
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const [cities, total] = await Promise.all([
    prisma.city.findMany({
      where,
      skip,
      take: limit,
      orderBy: { popularityScore: 'desc' },
    }),
    prisma.city.count({ where }),
  ]);

  return { 
    data: cities.map(formatCity), 
    total, 
    page, 
    limit 
  };
};

export const getCityById = async (id: string) => {
  const city = await prisma.city.findUnique({
    where: { id },
    include: {
      activities: {
        take: 10,
        orderBy: { isPopular: 'desc' }
      }
    }
  });
  return formatCity(city);
};

export const getTrendingCities = async (limit: number = 4) => {
  const cities = await prisma.city.findMany({
    take: limit,
    orderBy: { popularityScore: 'desc' },
  });
  return cities.map(formatCity);
};
