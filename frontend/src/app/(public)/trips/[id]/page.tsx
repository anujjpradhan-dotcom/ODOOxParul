"use client";

import { Compass, Share2, Copy, Heart, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListView } from "@/components/itinerary/ListView";
import { Trip, TripStop } from "@/types";
import { formatDateRange, formatCurrency } from "@/lib/utils";

const MOCK_TRIP: Trip = {
  id: "1",
  userId: "u1",
  name: "Summer in Kyoto",
  startDate: "2024-07-15",
  endDate: "2024-07-25",
  stopsCount: 2,
  status: "PLANNED",
  isPublic: true,
  shareSlug: "kyoto-2024",
  coverImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
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
    activities: []
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

export default function PublicTripPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pb-20">
      {/* Header */}
      <header className="h-16 px-6 glass flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-brand-primary" />
          <span className="text-xl font-bold font-display">Traveloop</span>
        </Link>
        <Button className="rounded-full bg-brand-primary hover:bg-brand-primary/90" asChild>
          <Link href="/signup">Plan Your Own Trip</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img 
          src={MOCK_TRIP.coverImageUrl} 
          alt={MOCK_TRIP.name} 
          className="w-full h-full object-cover animate-in zoom-in-110 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <div className="container px-6 text-center text-white space-y-6">
            <Badge className="bg-brand-primary text-white border-none px-6 py-1.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
              Featured Itinerary
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight leading-none drop-shadow-2xl">
              {MOCK_TRIP.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg md:text-xl font-medium text-stone-200">
               <div className="flex items-center gap-2">
                 <Calendar className="h-6 w-6 text-brand-primary" />
                 <span>{formatDateRange(MOCK_TRIP.startDate, MOCK_TRIP.endDate)}</span>
               </div>
               <div className="flex items-center gap-2">
                 <MapPin className="h-6 w-6 text-brand-primary" />
                 <span>{MOCK_TRIP.stopsCount} Destinations</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-12">
            {/* Creator Info */}
            <div className="bg-white dark:bg-stone-900 p-8 rounded-[40px] shadow-2xl flex items-center justify-between border">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-brand-primary/20">
                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Created by</p>
                  <p className="text-xl font-bold font-display">John Doe</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-stone-100">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-stone-100">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Itinerary */}
            <section className="space-y-8">
               <h2 className="text-4xl font-bold font-display tracking-tight">The Itinerary</h2>
               <ListView stops={MOCK_STOPS} />
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white dark:bg-stone-900 p-8 rounded-[40px] shadow-xl border space-y-8 sticky top-24">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display">Love this trip?</h3>
                <p className="text-muted-foreground">Copy this itinerary to your own account and start customizing it for your next adventure.</p>
              </div>
              
              <Button className="w-full h-16 rounded-3xl bg-brand-primary hover:bg-brand-primary/90 text-xl font-bold gap-3 shadow-lg shadow-brand-primary/20">
                <Copy className="h-6 w-6" />
                Copy to My Trips
              </Button>

              <div className="pt-8 border-t space-y-4">
                 <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Share this plan</h4>
                 <div className="grid grid-cols-4 gap-4">
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="aspect-square rounded-2xl bg-muted flex items-center justify-center hover:bg-brand-primary/10 transition-colors cursor-pointer group">
                       <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-brand-primary" />
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-brand-primary p-8 rounded-[40px] text-white space-y-6">
              <h3 className="text-2xl font-bold font-display leading-tight">Ready to plan your own dream journey?</h3>
              <p className="opacity-80">Join thousands of travelers using Traveloop to build perfect itineraries.</p>
              <Button variant="secondary" className="w-full h-14 rounded-2xl text-lg font-bold gap-2 bg-white text-brand-primary hover:bg-stone-50" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
