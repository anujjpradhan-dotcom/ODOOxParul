import { AppError } from '../middleware/error.middleware';

export const getProfile = async (userId: string) => {
  return { id: userId, email: 'user@example.com', firstName: 'John', lastName: 'Doe', languagePreference: 'en' };
};

export const updateProfile = async (userId: string, data: any) => {
  return { id: userId, email: 'user@example.com', ...data };
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  // Mock logic
};

export const deleteAccount = async (userId: string, password: string) => {
  // Mock logic
};

export const getSavedDestinations = async (userId: string) => {
  return [];
};

export const saveDestination = async (userId: string, cityId: string) => {
  return { cityId };
};

export const removeSavedDestination = async (userId: string, cityId: string) => {
  // Mock logic
};

export const getDashboardData = async (userId: string) => {
  return { recentTrips: [], stats: {}, recommendations: [] };
};
