"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface CitySearchBarProps {
  onSearch: (query: string) => void;
}

export function CitySearchBar({ onSearch }: CitySearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-stone-900 border-none shadow-xl rounded-2xl text-lg focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-muted-foreground"
        placeholder="Search cities, countries, or regions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
