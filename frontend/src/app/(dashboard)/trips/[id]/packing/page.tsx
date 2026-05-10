"use client";
import React from "react";

import { useState } from "react";
import { ChevronLeft, Plus, Check, Trash2, ShoppingBag, Laptop, FileText, Pill, Shirt, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  isPacked: boolean;
}

const MOCK_ITEMS: PackingItem[] = [
  { id: "1", name: "Passport", category: "Documents", isPacked: true },
  { id: "2", name: "Flight Tickets", category: "Documents", isPacked: true },
  { id: "3", name: "Power Bank", category: "Electronics", isPacked: false },
  { id: "4", name: "Camera", category: "Electronics", isPacked: false },
  { id: "5", name: "T-shirts (x5)", category: "Clothing", isPacked: true },
  { id: "6", name: "Jeans (x2)", category: "Clothing", isPacked: false },
  { id: "7", name: "Toothbrush", category: "Toiletries", isPacked: false },
  { id: "8", name: "Sunscreen", category: "Toiletries", isPacked: true },
];

const CATEGORIES = [
  { name: "Clothing", icon: Shirt, color: "text-blue-600", bg: "bg-blue-100" },
  { name: "Documents", icon: FileText, color: "text-amber-600", bg: "bg-amber-100" },
  { name: "Electronics", icon: Laptop, color: "text-purple-600", bg: "bg-purple-100" },
  { name: "Toiletries", icon: ShoppingBag, color: "text-pink-600", bg: "bg-pink-100" },
  { name: "Medication", icon: Pill, color: "text-teal-600", bg: "bg-teal-100" },
];

export default function PackingPage({ params }: { params: Promise<{ id: string }> }) {
  const [items, setItems] = useState<PackingItem[]>(MOCK_ITEMS);
  const [newItemName, setNewItemName] = useState("");

  const packedCount = items.filter(i => i.isPacked).length;
  const progress = (packedCount / items.length) * 100;

  const togglePacked = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isPacked: !item.isPacked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${React.use(params).id}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Packing List</h1>
            <p className="text-muted-foreground text-sm">Summer in Kyoto</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-stone-900 px-6 py-2 rounded-2xl border shadow-sm">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Progress</p>
            <p className="text-sm font-bold">{packedCount} of {items.length} packed</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center relative">
             <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="24" cy="24" r="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="text-muted" 
                />
                <circle 
                  cx="24" cy="24" r="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeDasharray={`${progress * 1.256}, 125.6`}
                  className="text-brand-primary transition-all duration-500" 
                />
             </svg>
             <span className="absolute text-[10px] font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border shadow-sm animate-slide-up">
        <div className="flex gap-2">
          <Input 
            placeholder="Add something to pack..." 
            className="h-12 rounded-2xl border-none bg-muted/50 text-lg pl-6"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <Button className="h-12 w-12 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 p-0">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map((cat) => {
          const categoryItems = items.filter(i => i.category === cat.name);
          if (categoryItems.length === 0) return null;
          
          const Icon = cat.icon;

          return (
            <div key={cat.name} className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 px-2">
                <div className={cn("p-2 rounded-xl", cat.bg, cat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold font-display">{cat.name}</h3>
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
                    onClick={() => togglePacked(item.id)}
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
                        deleteItem(item.id);
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
    </div>
  );
}
