export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  TRIPS: "/trips",
  CREATE_TRIP: "/trips/new",
  EXPLORE: "/explore",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  ADMIN: "/admin",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  TRIPS: {
    LIST: "/trips",
    CREATE: "/trips",
    DETAIL: (id: string) => `/trips/${id}`,
    STOPS: (id: string) => `/trips/${id}/stops`,
    ACTIVITIES: (id: string) => `/trips/${id}/activities`,
    BUDGET: (id: string) => `/trips/${id}/budget`,
    EXPENSES: (id: string) => `/trips/${id}/expenses`,
    PACKING: (id: string) => `/trips/${id}/packing`,
    NOTES: (id: string) => `/trips/${id}/notes`,
  },
  CITIES: {
    LIST: "/cities",
    DETAIL: (id: string) => `/cities/${id}`,
    POPULAR: "/cities/popular",
    ACTIVITIES: (id: string) => `/cities/${id}/activities`,
  },
  ACTIVITIES: {
    SEARCH: "/activities/search",
  },
  ADMIN: {
    STATS: "/admin/stats",
    USERS: "/admin/users",
  }
};

export const TRIP_STATUS = {
  DRAFT: "DRAFT",
  PLANNED: "PLANNED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const EXPENSE_CATEGORIES = [
  "Transport",
  "Accommodation",
  "Food",
  "Activities",
  "Shopping",
  "Miscellaneous",
];

export const PACKING_CATEGORIES = [
  "Clothing",
  "Documents",
  "Electronics",
  "Toiletries",
  "Medication",
  "Accessories",
];
