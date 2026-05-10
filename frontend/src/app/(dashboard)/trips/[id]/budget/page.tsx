"use client";

import { ChevronLeft, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { BudgetCharts } from "@/components/budget/BudgetCharts";
import { ExpenseList } from "@/components/budget/ExpenseList";
import { Expense } from "@/types";

const MOCK_EXPENSES: Expense[] = [
  { id: "e1", tripId: "1", category: "Transport", description: "Flight to Tokyo", amount: 850, currency: "USD", date: "2024-05-10" },
  { id: "e2", tripId: "1", category: "Accommodation", description: "Park Hyatt Tokyo", amount: 1200, currency: "USD", date: "2024-07-15" },
  { id: "e3", tripId: "1", category: "Food", description: "Sushi Dinner in Ginza", amount: 250, currency: "USD", date: "2024-07-16" },
  { id: "e4", tripId: "1", category: "Activities", description: "TeamLab Borderless Tickets", amount: 60, currency: "USD", date: "2024-07-17" },
  { id: "e5", tripId: "1", category: "Shopping", description: "Souvenirs in Akihabara", amount: 120, currency: "USD", date: "2024-07-18" },
];

export default function BudgetPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href={`/trips/${params.id}/builder`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Trip Budget</h1>
            <p className="text-muted-foreground text-sm">Summer in Kyoto</p>
          </div>
        </div>
        
        <Button variant="outline" className="rounded-2xl gap-2 h-11">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <BudgetOverview limit={5000} spent={2480} />
      
      <BudgetCharts />

      <ExpenseList expenses={MOCK_EXPENSES} />
    </div>
  );
}
