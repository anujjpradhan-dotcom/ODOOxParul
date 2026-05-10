import { AppError } from '../middleware/error.middleware';

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  costLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  popularityScore: number;
  averageDailyCost: number;
  imageUrl?: string;
}

const MOCK_CITIES: City[] = [
  { id: 'cuid_tokyo', name: 'Tokyo', country: 'Japan', region: 'Asia', costLevel: 'HIGH', popularityScore: 95, averageDailyCost: 150 },
  { id: 'cuid_bangkok', name: 'Bangkok', country: 'Thailand', region: 'Asia', costLevel: 'LOW', popularityScore: 92, averageDailyCost: 50 },
  { id: 'cuid_paris', name: 'Paris', country: 'France', region: 'Europe', costLevel: 'HIGH', popularityScore: 98, averageDailyCost: 200 },
];

export const searchCities = async (filters: any) => {
  let results = [...MOCK_CITIES];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
  }
  if (filters.country) results = results.filter(c => c.country === filters.country);
  if (filters.region) results = results.filter(c => c.region === filters.region);
  if (filters.costLevel) results = results.filter(c => c.costLevel === filters.costLevel);

  if (filters.sortBy === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sortBy === 'cost') {
    results.sort((a, b) => a.averageDailyCost - b.averageDailyCost);
  } else {
    results.sort((a, b) => b.popularityScore - a.popularityScore);
  }

  const total = results.length;
  const skip = (filters.page - 1) * filters.limit;
  const data = results.slice(skip, skip + filters.limit);

  return { data, total, page: filters.page, limit: filters.limit };
};

export const getCityDetails = async (cityId: string) => {
  const city = MOCK_CITIES.find(c => c.id === cityId);
  if (!city) throw new AppError('City not found', 404);
  return { ...city, activities: [], stats: {} };
};

export const getPopularCities = async (limit: number) => {
  return [...MOCK_CITIES].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, limit);
};

export const getRecommendedCities = async (userId: string) => {
  // Recommendation logic (rule-based, no AI)
  // E.g., check user's visited regions and cost levels and find matching cities not yet visited
  return [...MOCK_CITIES].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 5);
};
