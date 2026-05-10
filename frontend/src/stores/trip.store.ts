import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Trip } from "@/types";

interface TripState {
  activeTripId: string | null;
  activeTrip: Trip | null;
  setActiveTrip: (trip: Trip | null) => void;
  clearActiveTrip: () => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      activeTripId: null,
      activeTrip: null,
      setActiveTrip: (trip) => set({ activeTrip: trip, activeTripId: trip?.id || null }),
      clearActiveTrip: () => set({ activeTrip: null, activeTripId: null }),
    }),
    {
      name: "traveloop-trip-context",
    }
  )
);
