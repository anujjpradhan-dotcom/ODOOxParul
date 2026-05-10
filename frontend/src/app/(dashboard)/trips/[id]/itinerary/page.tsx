"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, List, Calendar as CalendarIcon, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ItinerarySummaryHeader } from "@/components/itinerary/ItinerarySummaryHeader";
import { ListView } from "@/components/itinerary/ListView";
import { CalendarView } from "@/components/itinerary/CalendarView";
import { ROUTES } from "@/lib/constants";
import { Trip, TripStop } from "@/types";

const MOCK_TRIP: Trip = {
  id: "1",
  userId: "u1",
  name: "Summer in Kyoto",
  startDate: "2024-07-15",
  endDate: "2024-07-25",
  stopsCount: 2,
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
        startTime: "10:00 AM",
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
        startTime: "7:00 PM",
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
    activities: [
      {
        id: "ta3",
        stopId: "s2",
        activityId: "a3",
        activity: {
          id: "a3",
          cityId: "c5",
          name: "Kinkaku-ji Temple",
          category: "History",
          cost: 15,
          duration: 60,
          description: ""
        },
        startTime: "09:30 AM",
        cost: 15,
        order: 0
      }
    ]
  }
];

export default function ItineraryPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href={`/trips/${MOCK_TRIP.id}/builder`}>
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <p className="text-muted-foreground text-sm font-medium">Back to Builder</p>
      </div>

      <ItinerarySummaryHeader trip={MOCK_TRIP} />

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
          <ListView stops={MOCK_STOPS} />
        </TabsContent>

        <TabsContent value="calendar" className="animate-in fade-in duration-500 outline-none">
          <CalendarView 
            stops={MOCK_STOPS} 
            startDate={MOCK_TRIP.startDate} 
            endDate={MOCK_TRIP.endDate} 
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
