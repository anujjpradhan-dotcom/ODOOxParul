"use client";

import { MapPin } from "lucide-react";
import { TripStop } from "@/types";
import { cn } from "@/lib/utils";

interface TimelineProps {
  stops: TripStop[];
}

export function Timeline({ stops }: TimelineProps) {
  return (
    <div className="flex flex-col items-center py-4">
      {stops.map((stop, index) => (
        <div key={stop.id} className="flex flex-col items-center">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500",
            index === 0 ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20" : "bg-white border-muted-foreground/20 text-muted-foreground"
          )}>
            <MapPin className="h-4 w-4" />
          </div>
          
          {index < stops.length - 1 && (
            <div className="w-0.5 h-16 bg-gradient-to-b from-brand-primary/20 to-muted-foreground/10 my-1" />
          )}
        </div>
      ))}
      
      {stops.length === 0 && (
        <div className="flex flex-col items-center gap-4 opacity-20">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground" />
          <div className="w-0.5 h-16 border-l-2 border-dashed border-muted-foreground" />
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground" />
        </div>
      )}
    </div>
  );
}
