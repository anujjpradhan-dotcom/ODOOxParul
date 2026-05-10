import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { API_ENDPOINTS, ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken, logout: clearAuth, user, isAuthenticated } = useAuthStore();

  const login = async (data: any) => {
    setIsLoading(true);
    try {
      const response: any = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
      setToken(response.accessToken);
      setUser(response.user);
      localStorage.setItem("accessToken", response.accessToken);
      toast.success("Welcome back!");
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: any) => {
    setIsLoading(true);
    try {
      const response: any = await api.post(API_ENDPOINTS.AUTH.SIGNUP, data);
      setToken(response.accessToken);
      setUser(response.user);
      localStorage.setItem("accessToken", response.accessToken);
      toast.success("Account created successfully!");
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
    toast.info("Logged out");
  };

  return {
    login,
    signup,
    logout,
    isLoading,
    user,
    isAuthenticated,
  };
}
