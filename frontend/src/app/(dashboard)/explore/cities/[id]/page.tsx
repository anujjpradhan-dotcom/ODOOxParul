"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Star, Clock, DollarSign, Plus, Share2, Heart, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CityMap } from "@/components/explore/CityMap";
import { useCities } from "@/hooks/useCities";
import { cn } from "@/lib/utils";
import { Activity } from "@/types";

export default function CityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { getCityDetails, isLoading } = useCities();
  const [city, setCity] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getCityDetails(id);
      setCity(data);
    };
    if (id) fetchDetails();
  }, [id, getCityDetails]);

  if (isLoading && !city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
        <p className="text-muted-foreground animate-pulse text-lg">Exploring destinations...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-full">
          <ChevronLeft className="h-12 w-12 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display">City not found</h2>
          <p className="text-muted-foreground max-w-md">
            The destination you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-8" asChild>
          <Link href="/explore">Back to Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="rounded-full gap-2 pl-2 pr-4 h-10" asChild>
          <Link href="/explore">
            <ChevronLeft className="h-5 w-5" />
            Back to Explore
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn("rounded-full h-10 w-10 border-none bg-muted/50 transition-colors", isSaved && "text-red-500")}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-none bg-muted/50">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-12">
          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl animate-fade-in">
            <img 
              src={city.imageUrl} 
              alt={city.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-brand-primary text-white border-none">
                  {city.region}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{city.popularity?.toFixed(1)} Rating</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display">{city.name}, {city.country}</h1>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold font-display tracking-tight text-brand-primary">About this city</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {city.description}
            </p>
          </section>

          {/* Activities */}
          {city.activities && city.activities.length > 0 && (
            <section className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold font-display tracking-tight text-brand-primary">Popular Activities</h2>
                <Button variant="link" className="text-brand-primary font-bold">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {city.activities.map((activity: Activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {/* Map */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold font-display">Location</h3>
            <CityMap lat={city.latitude} lng={city.longitude} cityName={city.name} />
          </section>

          {/* Stats Card */}
          <div className="p-8 bg-white dark:bg-stone-900 rounded-[32px] border shadow-sm space-y-8">
            <h3 className="font-bold text-2xl font-display text-brand-primary">At a glance</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-stone-100 dark:border-stone-800">
                <span className="text-muted-foreground">Cost Level</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <DollarSign key={i} className={cn("h-4 w-4", i <= city.costLevel ? "text-brand-primary" : "text-muted-foreground/20")} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-100 dark:border-stone-800">
                <span className="text-muted-foreground">Avg. Daily Cost</span>
                <span className="font-bold text-lg">${city.averageDailyCost || (city.costLevel * 50)} - ${city.averageDailyCost ? city.averageDailyCost + 50 : (city.costLevel * 100)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Time to Visit</span>
                <span className="font-bold">Mar - May</span>
              </div>
            </div>

            <Button className="w-full h-16 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20 text-lg font-bold gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-5 w-5" />
              Add to My Trip
            </Button>
          </div>

          <div className="p-6 bg-brand-primary/5 border border-brand-primary/10 rounded-3xl flex gap-4 animate-fade-in">
            <Info className="h-6 w-6 text-brand-primary shrink-0" />
            <div className="space-y-1">
              <h4 className="font-bold text-brand-primary">Travel Insight</h4>
              <p className="text-sm text-brand-primary/80">
                {city.name} is a favorite among travelers seeking {city.region === 'Asia' ? 'vibrant culture and delicious street food' : 'historic architecture and rich heritage'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {activity.imageUrl ? (
          <img 
            src={activity.imageUrl} 
            alt={activity.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
             <Info className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur-md text-black border-none text-[10px] uppercase font-bold px-2">
            {activity.category}
          </Badge>
        </div>
      </div>
      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <h4 className="font-bold text-xl font-display group-hover:text-brand-primary transition-colors">{activity.name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{activity.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{activity.duration || 60}m</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              <span>{activity.cost > 0 ? `$${activity.cost}` : "Free"}</span>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="rounded-full h-10 w-10 p-0 hover:bg-brand-primary hover:text-white transition-all">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
