export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  coverImageUrl?: string;
  totalBudget?: number;
  status: "DRAFT" | "PLANNED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  isPublic: boolean;
  shareSlug: string;
  stopsCount: number;
  user?: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  imageUrl: string;
  costLevel: 1 | 2 | 3 | 4; // 1: Budget, 4: Luxury
  popularity: number;
  latitude: number;
  longitude: number;
}

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  city: City;
  arrivalDate: string;
  departureDate: string;
  order: number;
  notes?: string;
  activities: TripActivity[];
}

export interface Activity {
  id: string;
  cityId: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  duration: number; // in minutes
  imageUrl?: string;
}

export interface TripActivity {
  id: string;
  stopId: string;
  activityId: string;
  activity: Activity;
  startTime?: string;
  notes?: string;
  cost: number;
  order: number;
}

export interface Expense {
  id: string;
  tripId: string;
  stopId?: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
}

export interface PackingItem {
  id: string;
  tripId: string;
  name: string;
  category: string;
  quantity: number;
  isPacked: boolean;
}

export interface TripNote {
  id: string;
  tripId: string;
  stopId?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
