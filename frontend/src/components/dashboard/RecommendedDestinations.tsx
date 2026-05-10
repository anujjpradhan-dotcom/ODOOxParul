import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { CityCard } from "@/components/shared/CityCard";
import { ROUTES } from "@/lib/constants";
import { City } from "@/types";

interface RecommendedDestinationsProps {
  cities: City[];
  isLoading?: boolean;
}

export function RecommendedDestinations({ cities, isLoading }: RecommendedDestinationsProps) {
  if (isLoading && cities.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-display">Popular Destinations</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl bg-white/50">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Popular Destinations</h2>
        <Link 
          href={ROUTES.EXPLORE} 
          className="text-brand-primary text-sm font-semibold flex items-center hover:underline"
        >
          See More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
