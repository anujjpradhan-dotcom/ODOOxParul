"use client";

import { MapPin, Clock, DollarSign } from "lucide-react";
import { TripStop, TripActivity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils";

interface ListViewProps {
  stops: TripStop[];
}

export function ListView({ stops }: ListViewProps) {
  return (
    <div className="space-y-12 py-4">
      {stops.map((stop, stopIndex) => (
        <div key={stop.id} className="relative pl-8 animate-fade-in" style={{ animationDelay: `${stopIndex * 100}ms` }}>
          {/* Vertical line connector */}
          {stopIndex < stops.length - 1 && (
            <div className="absolute left-3.5 top-10 bottom-[-48px] w-0.5 bg-gradient-to-b from-brand-primary/30 to-transparent" />
          )}
          
          <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-brand-primary/20">
            {stopIndex + 1}
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display">{stop.city.name}</h3>
              <p className="text-muted-foreground text-sm font-medium">
                {formatDateRange(stop.arrivalDate, stop.departureDate)}
              </p>
            </div>

            {stop.activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stop.activities.map((ta) => (
                  <ActivityCard key={ta.id} activity={ta} />
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-3xl border-2 border-dashed bg-stone-100/50 dark:bg-stone-900/50 text-center">
                <p className="text-sm text-muted-foreground font-medium">No activities scheduled for this stop.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityCard({ activity }: { activity: TripActivity }) {
  return (
    <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border hover:shadow-md transition-all group">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <Badge className="bg-muted text-muted-foreground hover:bg-muted border-none text-[10px] uppercase tracking-wider px-2">
            {activity.activity.category}
          </Badge>
          <span className="text-xs font-bold text-brand-primary">
            {activity.cost > 0 ? `$${activity.cost}` : "Free"}
          </span>
        </div>
        
        <h4 className="font-bold text-lg leading-tight group-hover:text-brand-primary transition-colors">
          {activity.activity.name}
        </h4>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{activity.activity.duration} mins</span>
          </div>
          {activity.startTime && (
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <span>{activity.startTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
