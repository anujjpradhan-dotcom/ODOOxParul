"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { CitySearchBar } from "@/components/explore/CitySearchBar";
import { CityCard } from "@/components/shared/CityCard";
import { Button } from "@/components/ui/button";
import { useCities } from "@/hooks/useCities";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const { cities, isLoading, searchCities } = useCities();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Western Europe", "Southern Europe", "East Asia", "Southeast Asia", "North America"];

  useEffect(() => {
    searchCities("", { region: activeFilter === "All" ? undefined : activeFilter });
  }, [searchCities, activeFilter]);

  const handleSearch = (query: string) => {
    searchCities(query, { region: activeFilter === "All" ? undefined : activeFilter });
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-brand-primary">Explore Destinations</h1>
        <p className="text-muted-foreground text-lg">
          Discover your next adventure from our curated list of world-class cities.
        </p>
      </div>

      <div className="space-y-8">
        <CitySearchBar onSearch={handleSearch} />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-6 h-10 transition-all",
                  activeFilter === filter ? "bg-brand-primary hover:bg-brand-primary/90 text-white" : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" className="rounded-full gap-2 h-10 px-6 border-none bg-muted/50 hover:bg-muted transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {isLoading && cities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-brand-primary" />
            <p className="text-muted-foreground animate-pulse">Finding beautiful places for you...</p>
          </div>
        ) : cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-muted/20">
            <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
            <Button 
              variant="link" 
              className="text-brand-primary mt-2"
              onClick={() => {
                setActiveFilter("All");
                searchCities("");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {cities.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button variant="outline" className="rounded-2xl px-12 h-12 hover:bg-brand-primary hover:text-white transition-all">
              Load More Destinations
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
