"use client";
import React, { useEffect } from "react";

import Link from "next/link";
import { ChevronLeft, Share2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItineraryBuilder } from "@/components/itinerary/ItineraryBuilder";
import { ROUTES } from "@/lib/constants";
import { useItinerary } from "@/hooks/useItinerary";

export default function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { trip, stops, isLoading, fetchTripDetails, addStop, removeStop } = useItinerary();

  useEffect(() => {
    if (id) {
      fetchTripDetails(id);
    }
  }, [id, fetchTripDetails]);

  if (isLoading && !trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
        <p className="text-muted-foreground animate-pulse text-lg">Loading your itinerary...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-full">
          <ChevronLeft className="h-12 w-12 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display">Trip not found</h2>
          <p className="text-muted-foreground max-w-md">
            The trip you are looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-8" asChild>
          <Link href={ROUTES.TRIPS}>Back to My Trips</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={ROUTES.TRIPS}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display line-clamp-1">{trip.name}</h1>
            <p className="text-muted-foreground text-sm">Itinerary Builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl gap-2 h-11">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="rounded-xl gap-2 h-11 bg-brand-primary hover:bg-brand-primary/90" asChild>
            <Link href={`/trips/${id}/itinerary`}>
              <Eye className="h-4 w-4" />
              View Itinerary
            </Link>
          </Button>
        </div>
      </div>

      <ItineraryBuilder 
        trip={trip} 
        stops={stops} 
        onAddStop={addStop} 
        onDeleteStop={(stopId) => removeStop(trip.id, stopId)} 
      />
    </div>
  );
}
