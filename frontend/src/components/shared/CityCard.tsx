import Link from "next/link";
import { Star, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { City } from "@/types";
import { cn } from "@/lib/utils";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const renderCost = (level: number) => {
    return Array(4).fill(0).map((_, i) => (
      <DollarSign 
        key={i} 
        className={cn("h-3 w-3", i < level ? "text-brand-primary" : "text-muted-foreground/30")} 
      />
    ));
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in">
      <Link href={`/explore/cities/${city.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img 
          src={city.imageUrl} 
          alt={city.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-md border-none text-white text-[10px]">
            {city.region}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-brand-primary mb-1">
            <MapPin className="h-3 w-3" />
            {city.country}
          </div>
          <h3 className="text-xl font-bold font-display leading-tight mb-2">{city.name}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              {renderCost(city.costLevel)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{city.popularity.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
