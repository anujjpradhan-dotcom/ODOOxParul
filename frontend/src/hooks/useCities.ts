import { useState } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { City } from "@/types";

export function useCities() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);

  const searchCities = async (query: string, filters?: any) => {
    setIsLoading(true);
    try {
      const response: any = await api.get(API_ENDPOINTS.CITIES.LIST, { 
        params: { q: query, ...filters } 
      });
      setCities(response.data || []);
    } catch (error) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  const getCityDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const response: any = await api.get(API_ENDPOINTS.CITIES.DETAIL(id));
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cities,
    isLoading,
    searchCities,
    getCityDetails,
  };
}
