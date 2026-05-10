"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, Plus, Search, FileText, Calendar, MoreVertical, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useNotes } from "@/hooks/useNotes";
import { useTrips } from "@/hooks/useTrips";

export default function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tripId } = React.use(params);
  const { notes, isLoading, fetchNotes, createNote, deleteNote } = useNotes(tripId);
  const { currentTrip, getTripById } = useTrips();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
    getTripById(tripId);
  }, [fetchNotes, getTripById, tripId]);

  const filteredNotes = notes.filter(n => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${tripId}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Trip Notes</h1>
            <p className="text-muted-foreground text-sm">{currentTrip?.name || "Loading..."}</p>
          </div>
        </div>
        
        <Button 
          className="rounded-2xl h-12 px-6 gap-2 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20"
          onClick={() => {
            const content = prompt("Enter note content:");
            if (content) createNote({ content, title: "Quick Note" });
          }}
        >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading && notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary/50" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <Card 
              key={note.id} 
              className="border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="rounded-full border-stone-100 dark:border-stone-800 text-[10px] uppercase font-bold text-muted-foreground">
                    {formatDate(note.createdAt, "MMM d")}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display line-clamp-1 group-hover:text-brand-primary transition-colors">{note.title || "Untitled"}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-end">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-destructive"
                      onClick={() => {
                        if (confirm("Delete this note?")) deleteNote(note.id);
                      }}
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <button 
            onClick={() => {
              const content = prompt("Enter note content:");
              if (content) createNote({ content, title: "New Note" });
            }}
            className="border-2 border-dashed rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all group min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8" />
            </div>
            <span className="font-bold font-display text-lg">Add New Note</span>
          </button>
        </div>
      )}
    </div>
  );
}
