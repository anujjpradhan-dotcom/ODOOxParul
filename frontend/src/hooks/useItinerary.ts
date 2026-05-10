import { useState } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Trip, TripStop } from "@/types";
import { toast } from "sonner";

export function useItinerary() {
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);

  const fetchTripDetails = async (tripId: string) => {
    setIsLoading(true);
    try {
      const response: any = await api.get(API_ENDPOINTS.TRIPS.DETAIL(tripId));
      setTrip(response.data);
      const stopsResponse: any = await api.get(API_ENDPOINTS.TRIPS.STOPS(tripId));
      setStops(stopsResponse.data || []);
    } catch (error: any) {
      // toast.error("Failed to load itinerary");
    } finally {
      setIsLoading(false);
    }
  };

  const addStop = async (tripId: string, data: any) => {
    try {
      const response: any = await api.post(API_ENDPOINTS.TRIPS.STOPS(tripId), data);
      setStops(prev => [...prev, response.data].sort((a, b) => a.order - b.order));
      toast.success("Stop added to itinerary");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to add stop");
    }
  };

  const removeStop = async (tripId: string, stopId: string) => {
    try {
      await api.delete(`${API_ENDPOINTS.TRIPS.STOPS(tripId)}/${stopId}`);
      setStops(prev => prev.filter(s => s.id !== stopId));
      toast.success("Stop removed");
    } catch (error: any) {
      toast.error("Failed to remove stop");
    }
  };

  const addActivity = async (tripId: string, stopId: string, data: any) => {
    try {
      const response: any = await api.post(`${API_ENDPOINTS.TRIPS.STOPS(tripId)}/${stopId}/activities`, data);
      setStops(prev => prev.map(s => 
        s.id === stopId 
          ? { ...s, activities: [...s.activities, response.data].sort((a, b) => a.order - b.order) } 
          : s
      ));
      toast.success("Activity added");
    } catch (error: any) {
      toast.error("Failed to add activity");
    }
  };

  return {
    trip,
    stops,
    isLoading,
    fetchTripDetails,
    addStop,
    removeStop,
    addActivity,
    setStops,
  };
}
