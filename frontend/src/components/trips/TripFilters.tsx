"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TripFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
}

export function TripFilters({ activeTab, onTabChange, onSearch, onSortChange }: TripFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between animate-fade-in">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full md:w-auto">
        <TabsList className="bg-muted/50 p-1 h-12 rounded-2xl">
          {["All", "Draft", "Planned", "Ongoing", "Completed"].map((tab) => (
            <TabsTrigger 
              key={tab} 
              value={tab.toUpperCase()} 
              className="rounded-xl px-4 md:px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search trips..." 
            className="pl-10 rounded-2xl border-none bg-muted/50 focus-visible:ring-brand-primary/20"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-2xl gap-2 border-none bg-muted/50 h-10 px-4">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem onClick={() => onSortChange("newest")}>Date (Newest)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("oldest")}>Date (Oldest)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("name-asc")}>Name A-Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("name-desc")}>Name Z-A</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
