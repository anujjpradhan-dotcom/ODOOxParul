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
    PUBLIC: (slug: string) => `/public/trips/${slug}`,
    DUPLICATE: (id: string) => `/trips/${id}/duplicate`,
  },
  BUDGET: {
    SUMMARY: (id: string) => `/trips/${id}/budget`,
    ADD_EXPENSE: (tripId: string, stopId: string) => `/trips/${tripId}/stops/${stopId}/expenses`,
    EXPENSE_DETAIL: (tripId: string, expenseId: string) => `/trips/${tripId}/expenses/${expenseId}`,
  },
  NOTES: {
    LIST: (id: string) => `/trips/${id}/notes`,
    CREATE: (id: string) => `/trips/${id}/notes`,
    DETAIL: (tripId: string, noteId: string) => `/trips/${tripId}/notes/${noteId}`,
  },
  PACKING: {
    LIST: (id: string) => `/trips/${id}/packing`,
    ADD: (id: string) => `/trips/${id}/packing`,
    TOGGLE: (tripId: string, itemId: string) => `/trips/${tripId}/packing/${itemId}/toggle`,
    DELETE: (tripId: string, itemId: string) => `/trips/${tripId}/packing/${itemId}`,
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
  "TRANSPORT",
  "ACCOMMODATION",
  "FOOD",
  "ACTIVITY",
  "SHOPPING",
  "MISCELLANEOUS",
];

export const PACKING_CATEGORIES = [
  "CLOTHING",
  "DOCUMENTS",
  "ELECTRONICS",
  "TOILETRIES",
  "MEDICATION",
  "ACCESSORIES",
  "OTHER",
];
