import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export function useDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<any>("/users/dashboard");
      setData(response.data);
    } catch (error: any) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    isLoading,
    refresh: fetchDashboardData,
  };
}
