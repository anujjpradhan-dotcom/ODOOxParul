"use client";
import React from "react";

import { useState } from "react";
import { ChevronLeft, Plus, Search, FileText, Calendar, MoreVertical, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  stop?: string;
}

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Kyoto Temple Rules",
    content: "Remember to take off shoes before entering the main hall. No photography allowed inside the temple. Bring socks as floors can be cold.",
    date: "2024-05-10",
    stop: "Kyoto"
  },
  {
    id: "2",
    title: "Best Ramen in Shibuya",
    content: "Found a small place near the crossing. It's called Ichiran, always has a queue but totally worth it. Cash only!",
    date: "2024-05-11",
    stop: "Tokyo"
  },
  {
    id: "3",
    title: "Packing List Update",
    content: "Need to buy a universal power adapter. Japan uses Type A/B (same as US). Also check if the camera charger supports 100V.",
    date: "2024-05-12"
  }
];

export default function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${React.use(params).id}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Trip Notes</h1>
            <p className="text-muted-foreground text-sm">Summer in Kyoto</p>
          </div>
        </div>
        
        <Button className="rounded-2xl h-12 px-6 gap-2 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20">
          <Plus className="h-5 w-5" />
          Create New Note
        </Button>
      </div>

      <div className="flex items-center gap-4 animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            className="pl-12 h-12 rounded-2xl border-none bg-muted/50 focus-visible:ring-brand-primary/20 text-lg shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <Card 
            key={note.id} 
            className="border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden group animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                  <FileText className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="rounded-full border-stone-100 dark:border-stone-800 text-[10px] uppercase font-bold text-muted-foreground">
                  {format(new Date(note.date), "MMM d")}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display line-clamp-1 group-hover:text-brand-primary transition-colors">{note.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                {note.stop ? (
                  <Badge className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 border-none rounded-full px-3 py-1 text-xs">
                    {note.stop}
                  </Badge>
                ) : <div />}
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                     <Edit2 className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive">
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <button className="border-2 border-dashed rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8" />
          </div>
          <span className="font-bold font-display text-lg">Add New Note</span>
        </button>
      </div>
    </div>
  );
}
