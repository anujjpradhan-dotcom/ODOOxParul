"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { TripStop } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, eachDayOfInterval, isSameDay } from "date-fns";

interface CalendarViewProps {
  stops: TripStop[];
  startDate: string;
  endDate: string;
}

export function CalendarView({ stops, startDate, endDate }: CalendarViewProps) {
  const days = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border shadow-sm animate-fade-in">
      <div className="grid grid-cols-7 gap-px bg-muted rounded-xl overflow-hidden border">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-stone-50 dark:bg-stone-800/50 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Simple grid - in a real app we'd pad with previous/next month days */}
        {days.map((day, i) => {
          const stopAtDay = stops.find(s => 
            new Date(day) >= new Date(s.arrivalDate) && 
            new Date(day) <= new Date(s.departureDate)
          );
          
          return (
            <div 
              key={day.toISOString()} 
              className={cn(
                "bg-white dark:bg-stone-900 min-h-[120px] p-2 flex flex-col gap-1 border-stone-100 dark:border-stone-800",
                i % 7 === 0 ? "border-l-0" : ""
              )}
            >
              <div className="flex justify-between items-center px-1">
                <span className="text-sm font-semibold">{format(day, "d")}</span>
                {format(day, "d") === "1" && (
                  <span className="text-[10px] font-bold uppercase text-brand-primary">{format(day, "MMM")}</span>
                )}
              </div>
              
              {stopAtDay && (
                <div className="flex-1 rounded-lg bg-brand-primary/10 p-2 border-l-2 border-brand-primary">
                  <p className="text-[10px] font-bold text-brand-primary truncate uppercase">
                    {stopAtDay.city.name}
                  </p>
                  <div className="mt-1 space-y-1">
                    {stopAtDay.activities.length > 0 && (
                      <p className="text-[9px] font-medium text-muted-foreground">
                        {stopAtDay.activities.length} {stopAtDay.activities.length === 1 ? "Activity" : "Activities"}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
