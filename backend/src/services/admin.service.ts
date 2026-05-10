export const getDashboardStats = async () => {
  return { totalUsers: 100, totalTrips: 500, activeUsers: 50, popularCities: [] };
};

export const getAllUsers = async (page: number, limit: number, search?: string) => {
  return { data: [], total: 0, page, limit };
};

export const getUserDetails = async (userId: string) => {
  return { id: userId, email: 'user@example.com', tripCount: 5 };
};

export const getTripsAnalytics = async (period: string) => {
  return { period, data: [] };
};

export const getTopCities = async (limit: number) => {
  return [];
};

export const getTopActivities = async (limit: number) => {
  return [];
};

export const getPlatformMetrics = async () => {
  return { avgTripsPerUser: 5, avgStopsPerTrip: 3 };
};
