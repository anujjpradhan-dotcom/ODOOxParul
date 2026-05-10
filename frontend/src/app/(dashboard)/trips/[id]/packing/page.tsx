"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, Plus, Check, Trash2, ShoppingBag, Laptop, FileText, Pill, Shirt, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePacking } from "@/hooks/usePacking";
import { useTrips } from "@/hooks/useTrips";

const CATEGORY_ICONS: Record<string, any> = {
  CLOTHING: Shirt,
  DOCUMENTS: FileText,
  ELECTRONICS: Laptop,
  TOILETRIES: ShoppingBag,
  MEDICATION: Pill,
  ACCESSORIES: Shirt, // Fallback
  OTHER: ShoppingBag, // Fallback
};

const CATEGORY_STYLES: Record<string, { color: string; bg: string }> = {
  CLOTHING: { color: "text-blue-600", bg: "bg-blue-100" },
  DOCUMENTS: { color: "text-amber-600", bg: "bg-amber-100" },
  ELECTRONICS: { color: "text-purple-600", bg: "bg-purple-100" },
  TOILETRIES: { color: "text-pink-600", bg: "bg-pink-100" },
  MEDICATION: { color: "text-teal-600", bg: "bg-teal-100" },
  ACCESSORIES: { color: "text-indigo-600", bg: "bg-indigo-100" },
  OTHER: { color: "text-stone-600", bg: "bg-stone-100" },
};

export default function PackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tripId } = React.use(params);
  const { items, isLoading, fetchItems, addItem, toggleItem, removeItem } = usePacking(tripId);
  const { currentTrip, getTripById } = useTrips();
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("CLOTHING");

  useEffect(() => {
    fetchItems();
    getTripById(tripId);
  }, [fetchItems, getTripById, tripId]);

  const packedCount = items.filter(i => i.isPacked).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    await addItem({ name: newItemName, category: selectedCategory });
    setNewItemName("");
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${tripId}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Packing List</h1>
            <p className="text-muted-foreground text-sm">{currentTrip?.name || "Loading..."}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-stone-900 px-6 py-2 rounded-2xl border shadow-sm">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Progress</p>
            <p className="text-sm font-bold">{packedCount} of {items.length} packed</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center relative">
             <svg className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                <circle 
                  cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" 
                  strokeDasharray={`${progress * 1.256}, 125.6`}
                  className="text-brand-primary transition-all duration-500" 
                />
             </svg>
             <span className="absolute text-[10px] font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-sm glass rounded-3xl overflow-hidden animate-slide-up">
        <form onSubmit={handleAddItem} className="p-6 space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Add something to pack..." 
              className="h-12 rounded-2xl border-none bg-muted/50 text-lg pl-6"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Button type="submit" className="h-12 w-12 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 p-0 shadow-lg shadow-brand-primary/20">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(CATEGORY_ICONS).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2",
                  selectedCategory === cat 
                    ? "bg-brand-primary border-brand-primary text-white" 
                    : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted"
                )}
              >
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </form>
      </Card>

      {isLoading && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary/50" />
        </div>
      ) : (
        <div className="space-y-12">
          {Object.keys(CATEGORY_ICONS).map((catName) => {
            const categoryItems = items.filter(i => i.category === catName);
            if (categoryItems.length === 0) return null;
            
            const Icon = CATEGORY_ICONS[catName];
            const styles = CATEGORY_STYLES[catName];

            return (
              <div key={catName} className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 px-2">
                  <div className={cn("p-2 rounded-xl", styles.bg, styles.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold font-display">{catName.charAt(0) + catName.slice(1).toLowerCase()}</h3>
                  <Badge variant="outline" className="rounded-full border-none bg-muted px-3">
                    {categoryItems.filter(i => i.isPacked).length} / {categoryItems.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryItems.map((item) => (
                    <div 
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                        item.isPacked 
                          ? "bg-stone-50 dark:bg-stone-900/50 border-stone-100 dark:border-stone-800 opacity-60" 
                          : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md"
                      )}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                          item.isPacked ? "bg-brand-primary border-brand-primary text-white" : "border-muted-foreground/30"
                        )}>
                          {item.isPacked && <Check className="h-4 w-4" />}
                        </div>
                        <span className={cn(
                          "font-medium transition-all",
                          item.isPacked && "line-through text-muted-foreground"
                        )}>
                          {item.name}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("bg-white dark:bg-stone-900 border", className)}>{children}</div>;
}
