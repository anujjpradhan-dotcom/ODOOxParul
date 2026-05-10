import { PrismaClient, CostLevel, ActivityCategory, TripStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const citiesData = [
  { name: 'Paris', country: 'France', region: 'Western Europe', costIndex: CostLevel.EXPENSIVE, popularityScore: 95, latitude: 48.8566, longitude: 2.3522, averageDailyCost: 200, description: 'City of Light' },
  { name: 'Tokyo', country: 'Japan', region: 'East Asia', costIndex: CostLevel.EXPENSIVE, popularityScore: 92, latitude: 35.6762, longitude: 139.6503, averageDailyCost: 180, description: 'Bustling metropolis' },
  { name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', costIndex: CostLevel.BUDGET, popularityScore: 88, latitude: 13.7563, longitude: 100.5018, averageDailyCost: 50, description: 'Street life and cultural landmarks' },
  { name: 'New York', country: 'USA', region: 'North America', costIndex: CostLevel.LUXURY, popularityScore: 90, latitude: 40.7128, longitude: -74.0060, averageDailyCost: 250, description: 'The Big Apple' },
  { name: 'Barcelona', country: 'Spain', region: 'Southern Europe', costIndex: CostLevel.MODERATE, popularityScore: 85, latitude: 41.3851, longitude: 2.1734, averageDailyCost: 120, description: 'Art and architecture' },
  { name: 'Bali', country: 'Indonesia', region: 'Southeast Asia', costIndex: CostLevel.BUDGET, popularityScore: 87, latitude: -8.3405, longitude: 115.0920, averageDailyCost: 60, description: 'Island of the Gods' },
  { name: 'London', country: 'UK', region: 'Western Europe', costIndex: CostLevel.EXPENSIVE, popularityScore: 91, latitude: 51.5074, longitude: -0.1278, averageDailyCost: 190, description: 'Historic and modern' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', costIndex: CostLevel.LUXURY, popularityScore: 83, latitude: 25.2048, longitude: 55.2708, averageDailyCost: 300, description: 'Luxury shopping and modern architecture' },
  { name: 'Istanbul', country: 'Turkey', region: 'Transcontinental', costIndex: CostLevel.MODERATE, popularityScore: 80, latitude: 41.0082, longitude: 28.9784, averageDailyCost: 80, description: 'Where East meets West' },
  { name: 'Rome', country: 'Italy', region: 'Southern Europe', costIndex: CostLevel.MODERATE, popularityScore: 89, latitude: 41.9028, longitude: 12.4964, averageDailyCost: 130, description: 'Eternal City' },
  { name: 'Mumbai', country: 'India', region: 'South Asia', costIndex: CostLevel.BUDGET, popularityScore: 75, latitude: 19.0760, longitude: 72.8777, averageDailyCost: 40, description: 'City of Dreams' },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: CostLevel.EXPENSIVE, popularityScore: 82, latitude: -33.8688, longitude: 151.2093, averageDailyCost: 170, description: 'Harbour City' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: CostLevel.MODERATE, popularityScore: 70, latitude: -33.9249, longitude: 18.4241, averageDailyCost: 90, description: 'Mother City' },
  { name: 'Mexico City', country: 'Mexico', region: 'North America', costIndex: CostLevel.BUDGET, popularityScore: 72, latitude: 19.4326, longitude: -99.1332, averageDailyCost: 60, description: 'Vibrant culture and history' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Western Europe', costIndex: CostLevel.MODERATE, popularityScore: 84, latitude: 52.3676, longitude: 4.9041, averageDailyCost: 140, description: 'Venice of the North' },
  { name: 'Seoul', country: 'South Korea', region: 'East Asia', costIndex: CostLevel.MODERATE, popularityScore: 78, latitude: 37.5665, longitude: 126.9780, averageDailyCost: 100, description: 'Dynamic and modern' },
  { name: 'Lisbon', country: 'Portugal', region: 'Southern Europe', costIndex: CostLevel.MODERATE, popularityScore: 81, latitude: 38.7223, longitude: -9.1393, averageDailyCost: 90, description: 'City of Seven Hills' },
  { name: 'Marrakech', country: 'Morocco', region: 'North Africa', costIndex: CostLevel.BUDGET, popularityScore: 68, latitude: 31.6295, longitude: -7.9811, averageDailyCost: 50, description: 'Red City' },
  { name: 'Vienna', country: 'Austria', region: 'Central Europe', costIndex: CostLevel.EXPENSIVE, popularityScore: 76, latitude: 48.2082, longitude: 16.3738, averageDailyCost: 150, description: 'City of Music' },
  { name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', costIndex: CostLevel.EXPENSIVE, popularityScore: 86, latitude: 1.3521, longitude: 103.8198, averageDailyCost: 160, description: 'Lion City' },
];

const activitiesTemplate = [
  { name: 'City Tour', category: ActivityCategory.SIGHTSEEING, estimatedCost: 30, estimatedDurationMinutes: 180, isPopular: true },
  { name: 'Food Walk', category: ActivityCategory.FOOD_TOUR, estimatedCost: 50, estimatedDurationMinutes: 150, isPopular: true },
  { name: 'Museum Visit', category: ActivityCategory.CULTURE, estimatedCost: 20, estimatedDurationMinutes: 120, isPopular: false },
  { name: 'Local Market', category: ActivityCategory.SHOPPING, estimatedCost: 10, estimatedDurationMinutes: 90, isPopular: false },
];

async function main() {
  console.log('Starting seed...');

  // Create Users
  const demoPassword = await bcrypt.hash('Demo123!', 10);
  const adminPassword = await bcrypt.hash('Admin123!', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@traveloop.com' },
    update: {},
    create: { email: 'demo@traveloop.com', passwordHash: demoPassword, firstName: 'Demo', lastName: 'User', isActive: true },
  });
  console.log('Created Demo User');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@traveloop.com' },
    update: {},
    create: { email: 'admin@traveloop.com', passwordHash: adminPassword, firstName: 'Admin', lastName: 'User', isAdmin: true, isActive: true },
  });
  console.log('Created Admin User');

  // Create Cities and Activities
  const createdCities = [];
  for (const cityData of citiesData) {
    const city = await prisma.city.upsert({
      where: { name_country: { name: cityData.name, country: cityData.country } },
      update: {},
      create: { ...cityData },
    });
    createdCities.push(city);
    console.log(`Created city: ${city.name}`);

    // Create activities for the city
    for (const act of activitiesTemplate) {
      await prisma.activity.create({
        data: {
          cityId: city.id,
          name: `${city.name} ${act.name}`,
          description: `Enjoy ${act.name} in ${city.name}`,
          category: act.category,
          estimatedCost: act.estimatedCost,
          estimatedDurationMinutes: act.estimatedDurationMinutes,
          isPopular: act.isPopular,
        }
      });
    }
  }

  // Create a Demo Trip
  if (createdCities.length >= 3) {
    const trip = await prisma.trip.create({
      data: {
        userId: demoUser.id,
        name: 'Euro Trip 2026',
        description: 'Exploring Western Europe',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        status: TripStatus.PLANNED,
        totalBudget: 3000,
        stops: {
          create: [
            { cityId: createdCities[0].id, orderIndex: 0, arrivalDate: new Date(), departureDate: new Date(new Date().setDate(new Date().getDate() + 3)) },
            { cityId: createdCities[4].id, orderIndex: 1, arrivalDate: new Date(new Date().setDate(new Date().getDate() + 3)), departureDate: new Date(new Date().setDate(new Date().getDate() + 6)) },
            { cityId: createdCities[6].id, orderIndex: 2, arrivalDate: new Date(new Date().setDate(new Date().getDate() + 6)), departureDate: new Date(new Date().setDate(new Date().getDate() + 10)) },
          ]
        }
      }
    });
    console.log(`Created Demo Trip: ${trip.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
