"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTripStore } from "@/stores/trip.store";

export function TripContextSetter() {
  const params = useParams();
  const tripId = params?.id as string;
  const { setActiveTrip, activeTripId } = useTripStore();

  useEffect(() => {
    if (tripId && tripId !== activeTripId) {
      // In a real app, we might fetch the trip here too, 
      // but for now we just set the ID to enable sidebar links.
      set({ activeTripId: tripId }); 
    }
  }, [tripId, activeTripId]);

  return null;
}

// Fixed version using the store's action
function set(state: { activeTripId: string }) {
  useTripStore.getState().setActiveTrip({ id: state.activeTripId } as any);
}
