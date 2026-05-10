"use client";

import { Clock, DollarSign, Trash2 } from "lucide-react";
import { TripActivity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StopActivityListProps {
  activities: TripActivity[];
}

export function StopActivityList({ activities = [] }: StopActivityListProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed rounded-2xl bg-muted/20">
        <p className="text-sm text-muted-foreground">No activities scheduled yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((item) => (
        <div 
          key={item.id} 
          className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
              {item.activity.imageUrl ? (
                <img src={item.activity.imageUrl} alt={item.activity.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase font-bold">
                  {item.activity.category[0]}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">{item.activity.name}</h4>
                <Badge variant="outline" className="text-[10px] py-0 h-4 uppercase tracking-wider">
                  {item.activity.category}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.activity.duration} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{item.cost}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
