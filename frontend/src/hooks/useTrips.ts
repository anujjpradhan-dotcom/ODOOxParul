import { useState } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Trip } from "@/types";
import { toast } from "sonner";

export function useTrips() {
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  const fetchTrips = async (filters?: any) => {
    setIsLoading(true);
    try {
      const response: any = await api.get(API_ENDPOINTS.TRIPS.LIST, { params: filters });
      setTrips(response.data || []);
    } catch (error: any) {
      // toast.error("Failed to fetch trips");
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (data: any) => {
    setIsLoading(true);
    try {
      const response: any = await api.post(API_ENDPOINTS.TRIPS.CREATE, data);
      toast.success("Trip created successfully!");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to create trip");
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
    } catch (error: any) {
      toast.error("Failed to delete trip");
    }
  };

  return {
    trips,
    isLoading,
    fetchTrips,
    createTrip,
    deleteTrip,
  };
}
