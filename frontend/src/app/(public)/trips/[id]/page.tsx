"use client";
import React, { useEffect, useState } from "react";
import { Compass, Share2, Copy, Heart, MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListView } from "@/components/itinerary/ListView";
import { Trip, TripStop } from "@/types";
import { formatDateRange, cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PublicTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = React.use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get<any>(API_ENDPOINTS.TRIPS.PUBLIC(slug));
        setTrip(response.data.trip);
        setStops(response.data.stops || []);
      } catch (error: any) {
        toast.error("Failed to load public trip");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [slug]);

  const handleDuplicate = async () => {
    if (!trip) return;
    try {
      const response = await api.post<Trip>(API_ENDPOINTS.TRIPS.DUPLICATE(trip.id));
      toast.success("Trip copied to your account!");
      router.push(`/trips/${response.data.id}/builder`);
    } catch (error: any) {
      if (error.status === 401) {
        toast.info("Please login to copy this trip");
        router.push("/login");
      } else {
        toast.error("Failed to copy trip");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
        <p className="text-muted-foreground animate-pulse">Loading amazing journey...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold font-display">Trip Not Found</h1>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

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
          src={trip.coverImageUrl || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop"} 
          alt={trip.name} 
          className="w-full h-full object-cover animate-in zoom-in-110 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <div className="container px-6 text-center text-white space-y-6">
            <Badge className="bg-brand-primary text-white border-none px-6 py-1.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-brand-primary/20">
              Shared Itinerary
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight leading-none drop-shadow-2xl">
              {trip.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg md:text-xl font-medium text-stone-200">
               <div className="flex items-center gap-2">
                 <Calendar className="h-6 w-6 text-brand-primary" />
                 <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
               </div>
               <div className="flex items-center gap-2">
                 <MapPin className="h-6 w-6 text-brand-primary" />
                 <span>{trip.stopsCount || stops.length} Destinations</span>
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
                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">
                    {trip.user?.firstName?.[0]}{trip.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Created by</p>
                  <p className="text-xl font-bold font-display">{trip.user?.firstName} {trip.user?.lastName}</p>
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
               <ListView stops={stops} />
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white dark:bg-stone-900 p-8 rounded-[40px] shadow-xl border space-y-8 sticky top-24">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display">Love this trip?</h3>
                <p className="text-muted-foreground">Copy this itinerary to your own account and start customizing it for your next adventure.</p>
              </div>
              
              <Button 
                onClick={handleDuplicate}
                className="w-full h-16 rounded-3xl bg-brand-primary hover:bg-brand-primary/90 text-xl font-bold gap-3 shadow-lg shadow-brand-primary/20"
              >
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
