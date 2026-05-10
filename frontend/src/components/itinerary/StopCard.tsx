"use client";

import { Calendar, MoreVertical, Trash2, Edit2, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TripStop } from "@/types";
import { cn, formatDateRange } from "@/lib/utils";
import { StopActivityList } from "./StopActivityList";

interface StopCardProps {
  stop: TripStop;
  index: number;
  onDelete: (id: string) => void;
  onAddActivity: (stopId: string) => void;
}

export function StopCard({ stop, index, onDelete, onAddActivity }: StopCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all animate-fade-in group">
      <div className="flex h-full">
        <div className="w-2 bg-brand-primary opacity-50 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex-1">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold font-display">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold text-lg font-display leading-none mb-1">
                  {stop.city.name}, <span className="text-muted-foreground font-normal">{stop.city.country}</span>
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDateRange(stop.arrivalDate, stop.departureDate)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-full bg-muted/50 border-none">
                {stop.activities.length} {stop.activities.length === 1 ? "Activity" : "Activities"}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(stop.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="h-px bg-muted mb-4" />
              <StopActivityList activities={stop.activities} />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4 rounded-xl border-dashed border-2 hover:border-brand-primary hover:text-brand-primary transition-all"
                onClick={() => onAddActivity(stop.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
