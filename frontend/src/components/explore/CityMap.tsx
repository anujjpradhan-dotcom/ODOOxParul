"use client";

import { MapPin } from "lucide-react";

interface CityMapProps {
  lat: number;
  lng: number;
  cityName: string;
}

export function CityMap({ lat, lng, cityName }: CityMapProps) {
  return (
    <div className="w-full h-96 rounded-3xl overflow-hidden relative border shadow-inner bg-stone-100 dark:bg-stone-900 group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative animate-bounce">
          <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative p-2 bg-brand-primary text-white rounded-full shadow-lg">
            <MapPin className="h-8 w-8" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</p>
          <p className="text-sm font-bold">{cityName}</p>
          <p className="text-[10px] text-muted-foreground">{lat.toFixed(4)}, {lng.toFixed(4)}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-2 rounded-xl shadow-lg border flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-bold">+</div>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-bold">-</div>
          </div>
        </div>
      </div>
    </div>
  );
}
