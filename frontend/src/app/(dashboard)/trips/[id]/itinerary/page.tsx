"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, List, Calendar as CalendarIcon, Map as MapIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ItinerarySummaryHeader } from "@/components/itinerary/ItinerarySummaryHeader";
import { ListView } from "@/components/itinerary/ListView";
import { CalendarView } from "@/components/itinerary/CalendarView";
import { ROUTES } from "@/lib/constants";
import { useItinerary } from "@/hooks/useItinerary";

export default function ItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { trip, stops, isLoading, fetchTripDetails } = useItinerary();

  useEffect(() => {
    if (id) {
      fetchTripDetails(id);
    }
  }, [id, fetchTripDetails]);

  if (isLoading && !trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
        <p className="text-muted-foreground animate-pulse text-lg">Loading your adventure...</p>
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
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href={`/trips/${id}/builder`}>
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <p className="text-muted-foreground text-sm font-medium">Back to Builder</p>
      </div>

      <ItinerarySummaryHeader trip={trip} />

      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-muted/50 h-12 p-1 rounded-2xl">
            <TabsTrigger value="list" className="rounded-xl gap-2 px-6">
              <List className="h-4 w-4" />
              <span>List View</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-xl gap-2 px-6">
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-xl gap-2 px-6">
              <MapIcon className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" className="rounded-2xl h-11 hidden md:flex">
            Export as PDF
          </Button>
        </div>

        <TabsContent value="list" className="animate-in fade-in duration-500 outline-none">
          <ListView stops={stops} />
        </TabsContent>

        <TabsContent value="calendar" className="animate-in fade-in duration-500 outline-none">
          <CalendarView 
            stops={stops} 
            startDate={trip.startDate} 
            endDate={trip.endDate} 
          />
        </TabsContent>
        
        <TabsContent value="timeline" className="animate-in fade-in duration-500 outline-none">
          <div className="p-12 text-center border-2 border-dashed rounded-3xl bg-white/50">
            <p className="text-muted-foreground">Timeline view coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
