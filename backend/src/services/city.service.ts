import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { CostLevel, Prisma } from '@prisma/client';

export const searchCities = async (filters: any) => {
  const where: Prisma.CityWhereInput = {};

  if (filters.query) {
    where.OR = [
      { name: { contains: filters.query, mode: 'insensitive' } },
      { country: { contains: filters.query, mode: 'insensitive' } },
    ];
  }
  if (filters.country) where.country = filters.country;
  if (filters.region) where.region = filters.region;
  if (filters.costLevel) where.costIndex = filters.costLevel as CostLevel;

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  let orderBy: Prisma.CityOrderByWithRelationInput = { popularityScore: 'desc' };
  
  if (filters.sortBy === 'name') {
    orderBy = { name: 'asc' };
  } else if (filters.sortBy === 'cost') {
    orderBy = { averageDailyCost: 'asc' };
  }

  const [cities, total] = await Promise.all([
    prisma.city.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.city.count({ where }),
  ]);

  return { data: cities, total, page, limit };
};

export const getCityDetails = async (cityId: string) => {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: {
      activities: {
        take: 5,
        orderBy: { isPopular: 'desc' },
      },
    },
  });

  if (!city) throw new AppError('City not found', 404);
  return city;
};

export const getPopularCities = async (limit: number) => {
  return prisma.city.findMany({
    take: limit || 10,
    orderBy: { popularityScore: 'desc' },
  });
};

export const getRecommendedCities = async (userId: string) => {
  // Recommendation logic (rule-based)
  // For now, return top 5 popular cities
  return prisma.city.findMany({
    take: 5,
    orderBy: { popularityScore: 'desc' },
  });
};
