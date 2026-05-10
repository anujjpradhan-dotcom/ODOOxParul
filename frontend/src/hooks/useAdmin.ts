import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export interface AdminStats {
  totalUsers: number;
  totalTrips: number;
  activeUsers: number;
  popularCities: any[];
}

export interface PlatformMetrics {
  avgTripsPerUser: number;
  avgStopsPerTrip: number;
}

export function useAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsRes, metricsRes, usersRes] = await Promise.all([
        api.get<AdminStats>(API_ENDPOINTS.ADMIN.STATS),
        api.get<PlatformMetrics>("/admin/metrics"), // Adding this endpoint
        api.get<any>(API_ENDPOINTS.ADMIN.USERS),
      ]);
      
      setStats(statsRes.data);
      setMetrics(metricsRes.data);
      setUsers(usersRes.data);
    } catch (error: any) {
      toast.error("Failed to fetch admin dashboard data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stats,
    metrics,
    users,
    isLoading,
    fetchDashboardData,
  };
}
