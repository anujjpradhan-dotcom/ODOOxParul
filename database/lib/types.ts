import { Prisma } from '@prisma/client';

export * from '@prisma/client';

export type TripWithStops = Prisma.TripGetPayload<{
  include: { stops: true };
}>;

export type StopWithActivities = Prisma.TripStopGetPayload<{
  include: { activities: { include: { activity: true } } };
}>;

export type UserWithTrips = Prisma.UserGetPayload<{
  include: { trips: true };
}>;

export type TripWithFullDetails = Prisma.TripGetPayload<{
  include: {
    stops: {
      include: {
        city: true;
        activities: {
          include: { activity: true };
        };
        expenses: true;
      };
    };
    packingItems: true;
    notes: true;
  };
}>;

export type CityWithActivities = Prisma.CityGetPayload<{
  include: { activities: true };
}>;

export type StopWithExpenses = Prisma.TripStopGetPayload<{
  include: { expenses: true };
}>;
