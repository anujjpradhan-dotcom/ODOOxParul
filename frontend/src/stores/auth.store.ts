import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (accessToken) => set({ accessToken }),
      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
      },
    }),
    {
      name: "traveloop-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
