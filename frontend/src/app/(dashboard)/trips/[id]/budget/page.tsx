"use client";
import React, { useEffect } from "react";
import { ChevronLeft, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { BudgetCharts } from "@/components/budget/BudgetCharts";
import { ExpenseList } from "@/components/budget/ExpenseList";
import { useBudget } from "@/hooks/useBudget";
import { useTrips } from "@/hooks/useTrips";

export default function BudgetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tripId } = React.use(params);
  const { summary, isLoading, fetchSummary } = useBudget(tripId);
  const { currentTrip, getTripById } = useTrips();

  useEffect(() => {
    fetchSummary();
    getTripById(tripId);
  }, [fetchSummary, getTripById, tripId]);

  if (isLoading && !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-brand-primary" />
        <p className="text-muted-foreground animate-pulse">Calculating your expenses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${tripId}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Trip Budget</h1>
            <p className="text-muted-foreground text-sm">{currentTrip?.name || "Loading trip..."}</p>
          </div>
        </div>
        
        <Button variant="outline" className="rounded-2xl gap-2 h-11">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <BudgetOverview 
        limit={summary?.budgetLimit || currentTrip?.totalBudget || 0} 
        spent={summary?.totalActual || 0} 
      />
      
      <BudgetCharts breakdown={summary?.breakdown || {}} />

      {/* Since the summary doesn't return all individual expenses yet, we'd need a separate call or update summary service */}
      {/* For now, we'll show empty or handle via summary data if it's updated */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 text-sm">
        Individual expense listing is currently integrated at the Stop level in the Itinerary Builder.
      </div>
    </div>
  );
}
