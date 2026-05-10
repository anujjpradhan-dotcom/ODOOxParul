import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { City } from "@/types";
import { toast } from "sonner";

export function useCities() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [total, setTotal] = useState(0);

  const searchCities = useCallback(async (query: string = "", filters?: any) => {
    setIsLoading(true);
    try {
      // The API returns ApiResponse<PaginatedResponse<City>>
      const response = await api.get<any>(API_ENDPOINTS.CITIES.LIST, { 
        params: { q: query, ...filters } 
      });
      
      const result = response.data;
      if (result && typeof result === 'object' && 'data' in result) {
        setCities(result.data || []);
        setTotal(result.total || result.data?.length || 0);
      } else if (Array.isArray(result)) {
        setCities(result);
        setTotal(result.length);
      } else {
        setCities([]);
        setTotal(0);
      }
    } catch (error: any) {
      toast.error("Failed to fetch cities");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCityDetails = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.get<City>(API_ENDPOINTS.CITIES.DETAIL(id));
      return response.data;
    } catch (error: any) {
      toast.error("Failed to load city details");
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    cities,
    total,
    isLoading,
    searchCities,
    getCityDetails,
  };
}
