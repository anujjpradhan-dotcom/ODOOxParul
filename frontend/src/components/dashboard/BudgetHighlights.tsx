"use client";

import { Wallet, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, cn } from "@/lib/utils";

interface BudgetHighlightsProps {
  stats?: {
    totalSpentYear: number;
    upcomingBudget: number;
    avgDailyCost: number;
  };
  isLoading?: boolean;
}

export function BudgetHighlights({ stats, isLoading }: BudgetHighlightsProps) {
  const displayStats = [
    {
      label: `Total Spent (${new Date().getFullYear()})`,
      value: stats?.totalSpentYear || 0,
      icon: Wallet,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
      label: "Upcoming Budget",
      value: stats?.upcomingBudget || 0,
      icon: Calendar,
      color: "text-teal-600",
      bg: "bg-teal-100 dark:bg-teal-900/20",
    },
    {
      label: "Avg. Daily Cost",
      value: stats?.avgDailyCost || 0,
      icon: TrendingUp,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-none shadow-sm glass animate-fade-in overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold font-display">
                  {formatCurrency(stat.value)}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
