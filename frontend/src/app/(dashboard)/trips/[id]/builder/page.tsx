"use client";

import Link from "next/link";
import { ChevronLeft, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItineraryBuilder } from "@/components/itinerary/ItineraryBuilder";
import { ROUTES } from "@/lib/constants";
import { Trip, TripStop } from "@/types";

const MOCK_TRIP: Trip = {
  id: "1",
  userId: "u1",
  name: "Summer in Kyoto",
  startDate: "2024-07-15",
  endDate: "2024-07-25",
  stopsCount: 3,
  status: "PLANNED",
  isPublic: false,
  shareSlug: "kyoto-2024",
  coverImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
  createdAt: "",
  updatedAt: "",
};

const MOCK_STOPS: TripStop[] = [
  {
    id: "s1",
    tripId: "1",
    cityId: "c2",
    city: {
      id: "c2",
      name: "Tokyo",
      country: "Japan",
      region: "Asia",
      imageUrl: "",
      costLevel: 3,
      popularity: 4.8,
      description: "",
      latitude: 0,
      longitude: 0
    },
    arrivalDate: "2024-07-15",
    departureDate: "2024-07-18",
    order: 0,
    activities: [
      {
        id: "ta1",
        stopId: "s1",
        activityId: "a1",
        activity: {
          id: "a1",
          cityId: "c2",
          name: "Shibuya Crossing",
          category: "Sightseeing",
          cost: 0,
          duration: 30,
          description: ""
        },
        cost: 0,
        order: 0
      },
      {
        id: "ta2",
        stopId: "s1",
        activityId: "a2",
        activity: {
          id: "a2",
          cityId: "c2",
          name: "Robot Restaurant Show",
          category: "Entertainment",
          cost: 80,
          duration: 90,
          description: ""
        },
        cost: 80,
        order: 1
      }
    ]
  },
  {
    id: "s2",
    tripId: "1",
    cityId: "c5",
    city: {
      id: "c5",
      name: "Kyoto",
      country: "Japan",
      region: "Asia",
      imageUrl: "",
      costLevel: 3,
      popularity: 4.9,
      description: "",
      latitude: 0,
      longitude: 0
    },
    arrivalDate: "2024-07-18",
    departureDate: "2024-07-22",
    order: 1,
    activities: []
  }
];

export default function BuilderPage({ params }: { params: { id: string } }) {
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
            <h1 className="text-2xl md:text-3xl font-bold font-display line-clamp-1">{MOCK_TRIP.name}</h1>
            <p className="text-muted-foreground text-sm">Itinerary Builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl gap-2 h-11">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="rounded-xl gap-2 h-11 bg-brand-primary hover:bg-brand-primary/90" asChild>
            <Link href={`/trips/${params.id}/itinerary`}>
              <Eye className="h-4 w-4" />
              View Itinerary
            </Link>
          </Button>
        </div>
      </div>

      <ItineraryBuilder trip={MOCK_TRIP} initialStops={MOCK_STOPS} />
    </div>
  );
}
