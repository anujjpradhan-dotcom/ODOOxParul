"use client";

import { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StopCard } from "./StopCard";
import { Timeline } from "./Timeline";
import { AddStopDialog } from "./AddStopDialog";
import { Trip, TripStop } from "@/types";

interface ItineraryBuilderProps {
  trip: Trip;
  stops: TripStop[];
  onAddStop: (tripId: string, data: any) => Promise<any>;
  onDeleteStop: (id: string) => Promise<any>;
}

export function ItineraryBuilder({ trip, stops, onAddStop, onDeleteStop }: ItineraryBuilderProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDeleteStop = async (id: string) => {
    if (confirm("Remove this stop from your itinerary?")) {
      await onDeleteStop(id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-8">
      {/* Timeline Column */}
      <div className="hidden lg:block">
        <Timeline stops={stops} />
      </div>

      {/* Main Builder Column */}
      <div className="space-y-6">
        {stops.length > 0 ? (
          <div className="space-y-6">
            {stops.map((stop, index) => (
              <StopCard 
                key={stop.id} 
                stop={stop} 
                index={index} 
                onDelete={handleDeleteStop}
                onAddActivity={() => {}} 
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-3xl p-20 text-center space-y-6 bg-white/50 animate-fade-in">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Plus className="h-8 w-8 text-brand-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display">Start Your Itinerary</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Your trip currently has no stops. Add your first destination to begin planning.
              </p>
            </div>
            <Button 
              size="lg" 
              className="rounded-2xl bg-brand-primary hover:bg-brand-primary/90 px-8"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add First Stop
            </Button>
          </div>
        )}

        {stops.length > 0 && (
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-16 rounded-3xl border-dashed border-2 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Add Another Stop
          </Button>
        )}

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-2xl flex gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Pro Tip:</strong> You can drag stops to reorder them in your timeline.
          </p>
        </div>
      </div>

      <AddStopDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddStop={(data) => onAddStop(trip.id, data)}
        trip={trip}
      />
    </div>
  );
}
