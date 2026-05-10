"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, LayoutGrid, List as ListIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/shared/TripCard";
import { TripFilters } from "@/components/trips/TripFilters";
import { useTrips } from "@/hooks/useTrips";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MyTripsPage() {
  const { trips, isLoading, fetchTrips, deleteTrip } = useTrips();
  const [activeTab, setActiveTab] = useState("ALL");
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");

  useEffect(() => {
    fetchTrips({ status: activeTab === "ALL" ? undefined : activeTab });
  }, [fetchTrips, activeTab]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">My Trips</h1>
          <p className="text-muted-foreground">Manage and track all your travel adventures.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 gap-2 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20" asChild>
          <Link href={ROUTES.CREATE_TRIP}>
            <Plus className="h-5 w-5" />
            Create New Trip
          </Link>
        </Button>
      </div>

      <TripFilters 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSearch={() => {}}
        onSortChange={() => {}}
      />

      <div className="flex justify-end">
        <div className="bg-muted/50 p-1 rounded-xl inline-flex">
          <Button 
            variant={viewMode === "GRID" ? "secondary" : "ghost"} 
            size="sm" 
            className="rounded-lg h-8 w-8 p-0"
            onClick={() => setViewMode("GRID")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "LIST" ? "secondary" : "ghost"} 
            size="sm" 
            className="rounded-lg h-8 w-8 p-0"
            onClick={() => setViewMode("LIST")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading && trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          <p className="text-muted-foreground animate-pulse">Loading your adventures...</p>
        </div>
      ) : trips.length > 0 ? (
        <div className={cn(
          "grid gap-6 animate-fade-in",
          viewMode === "GRID" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {trips.map((trip) => (
            <TripCard 
              key={trip.id} 
              trip={trip} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-3xl p-20 text-center space-y-6 bg-white/50 animate-fade-in">
          <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display">No trips found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Start planning your first adventure by creating a new trip.
            </p>
          </div>
          <Button variant="default" className="rounded-2xl" asChild>
            <Link href={ROUTES.CREATE_TRIP}>Create New Trip</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
