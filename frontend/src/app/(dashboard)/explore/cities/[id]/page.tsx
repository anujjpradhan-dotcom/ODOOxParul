"use client";

import { ChevronLeft, Star, Clock, DollarSign, Plus, Share2, Heart, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CityMap } from "@/components/explore/CityMap";
import { City, Activity } from "@/types";

const MOCK_CITY: City = {
  id: "c2",
  name: "Tokyo",
  country: "Japan",
  region: "Asia",
  description: "Tokyo is Japan's capital and the world's most populous metropolis. It offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors. The city's history can be appreciated in districts such as Asakusa and in many excellent museums, historic temples and gardens.",
  imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
  costLevel: 3,
  popularity: 4.8,
  latitude: 35.6762,
  longitude: 139.6503,
};

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    cityId: "c2",
    name: "Shibuya Crossing",
    description: "Experience the world's busiest pedestrian crossing.",
    category: "Sightseeing",
    cost: 0,
    duration: 30,
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "a2",
    cityId: "c2",
    name: "Robot Restaurant Show",
    description: "A flashy, futuristic performance with robots and lights.",
    category: "Entertainment",
    cost: 80,
    duration: 90,
    imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "a3",
    cityId: "c2",
    name: "Tsukiji Outer Market",
    description: "Sample fresh seafood and street food at this historic market.",
    category: "Food",
    cost: 20,
    duration: 120,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400&auto=format&fit=crop"
  }
];

export default function CityDetailsPage({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = useState(false);

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
              src={MOCK_CITY.imageUrl} 
              alt={MOCK_CITY.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-brand-primary text-white border-none">
                  {MOCK_CITY.region}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{MOCK_CITY.popularity} Rating</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display">{MOCK_CITY.name}, {MOCK_CITY.country}</h1>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold font-display tracking-tight">About this city</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {MOCK_CITY.description}
            </p>
          </section>

          {/* Activities */}
          <section className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-display tracking-tight">Popular Activities</h2>
              <Button variant="link" className="text-brand-primary font-bold">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ACTIVITIES.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {/* Map */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold font-display">Location</h3>
            <CityMap lat={MOCK_CITY.latitude} lng={MOCK_CITY.longitude} cityName={MOCK_CITY.name} />
          </section>

          {/* Stats Card */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border shadow-sm space-y-6">
            <h3 className="font-bold text-xl font-display">At a glance</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-muted-foreground text-sm">Cost Level</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <DollarSign key={i} className={cn("h-4 w-4", i <= MOCK_CITY.costLevel ? "text-brand-primary" : "text-muted-foreground/20")} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-muted-foreground text-sm">Avg. Daily Cost</span>
                <span className="font-bold">{MOCK_CITY.costLevel * 50} - {MOCK_CITY.costLevel * 100}$</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground text-sm">Best Time to Visit</span>
                <span className="font-bold">Mar - May</span>
              </div>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 text-lg font-bold gap-3">
              <Plus className="h-5 w-5" />
              Add to My Trip
            </Button>
          </div>

          <div className="p-6 bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-3xl flex gap-4">
            <Info className="h-6 w-6 text-teal-600 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-bold text-teal-900 dark:text-teal-100">Travel Insight</h4>
              <p className="text-sm text-teal-800 dark:text-teal-200">
                Kyoto is just a 2.5 hour Shinkansen ride away. Most travelers combine these cities.
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
        <img 
          src={activity.imageUrl} 
          alt={activity.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur-md text-black border-none text-[10px] uppercase font-bold px-2">
            {activity.category}
          </Badge>
        </div>
      </div>
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h4 className="font-bold text-xl font-display">{activity.name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{activity.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{activity.duration}m</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              <span>{activity.cost > 0 ? activity.cost : "Free"}</span>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0 hover:bg-brand-primary hover:text-white">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
