import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Trip } from "@/types";
import { toast } from "sonner";

export function useTrips() {
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const fetchTrips = useCallback(async (filters?: any) => {
    setIsLoading(true);
    try {
      const response = await api.get<Trip[]>(API_ENDPOINTS.TRIPS.LIST, { params: filters });
      setTrips(response.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch trips");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTripById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.get<Trip>(API_ENDPOINTS.TRIPS.DETAIL(id));
      setCurrentTrip(response.data);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to fetch trip details");
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTrip = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post<Trip>(API_ENDPOINTS.TRIPS.CREATE, data);
      toast.success("Trip created successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to create trip");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTrip = async (id: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await api.put<Trip>(API_ENDPOINTS.TRIPS.DETAIL(id), data);
      toast.success("Trip updated successfully!");
      if (currentTrip && currentTrip.id === id) {
        setCurrentTrip(response.data);
      }
      setTrips(prev => prev.map(t => t.id === id ? response.data : t));
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to update trip");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.TRIPS.DETAIL(id));
      setTrips(prev => prev.filter(t => t.id !== id));
      toast.success("Trip deleted");
      return true;
    } catch (error: any) {
      toast.error("Failed to delete trip");
      return false;
    }
  };

  return {
    trips,
    currentTrip,
    isLoading,
    fetchTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
  };
}
