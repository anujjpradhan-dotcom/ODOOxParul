"use client";

import { useState } from "react";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { CitySearchBar } from "@/components/explore/CitySearchBar";
import { CityCard } from "@/components/shared/CityCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { City } from "@/types";

const MOCK_CITIES: City[] = [
  {
    id: "c1",
    name: "Paris",
    country: "France",
    region: "Europe",
    description: "The City of Light",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    costLevel: 3,
    popularity: 4.9,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c2",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    description: "The bustling capital of Japan",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop",
    costLevel: 3,
    popularity: 4.8,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c3",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    description: "Island of Gods",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    costLevel: 1,
    popularity: 4.7,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c4",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    description: "Stunning blue domes",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop",
    costLevel: 4,
    popularity: 4.9,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c5",
    name: "New York",
    country: "USA",
    region: "Americas",
    description: "The Big Apple",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop",
    costLevel: 4,
    popularity: 4.8,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c6",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    description: "Pyramids and history",
    imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=600&auto=format&fit=crop",
    costLevel: 2,
    popularity: 4.5,
    latitude: 0,
    longitude: 0,
  }
];

export default function ExplorePage() {
  const [cities, setCities] = useState<City[]>(MOCK_CITIES);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"];

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">Explore Destinations</h1>
        <p className="text-muted-foreground text-lg">
          Discover your next adventure from our curated list of world-class cities.
        </p>
      </div>

      <div className="space-y-8">
        <CitySearchBar onSearch={() => {}} />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-6 h-10",
                  activeFilter === filter ? "bg-brand-primary hover:bg-brand-primary/90" : "text-muted-foreground"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" className="rounded-full gap-2 h-10 px-6 border-none bg-muted/50">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button variant="outline" className="rounded-2xl px-12 h-12">
            Load More Destinations
          </Button>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
