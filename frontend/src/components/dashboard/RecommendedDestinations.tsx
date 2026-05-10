import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CityCard } from "@/components/shared/CityCard";
import { ROUTES } from "@/lib/constants";
import { City } from "@/types";

interface RecommendedDestinationsProps {
  cities: City[];
}

export function RecommendedDestinations({ cities }: RecommendedDestinationsProps) {
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
