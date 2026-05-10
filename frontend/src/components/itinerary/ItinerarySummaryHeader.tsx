"use client";

import { MapPin, Calendar, Users, DollarSign, Share2, Edit2 } from "lucide-react";
import Link from "next/link";
import { Trip } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, formatCurrency } from "@/lib/utils";

interface ItinerarySummaryHeaderProps {
  trip: Trip;
}

export function ItinerarySummaryHeader({ trip }: ItinerarySummaryHeaderProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-none">
              {trip.status}
            </Badge>
            {trip.isPublic && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                Public
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight leading-none">
            {trip.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{trip.stopsCount} Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Estimated: {formatCurrency(1250)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl gap-2 h-12 px-6">
            <Share2 className="h-4 w-4" />
            Share Trip
          </Button>
          <Button className="rounded-2xl gap-2 h-12 px-6 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20" asChild>
            <Link href={`/trips/${trip.id}/builder`}>
              <Edit2 className="h-4 w-4" />
              Edit Itinerary
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
