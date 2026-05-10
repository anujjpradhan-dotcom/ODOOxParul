"use client";

import { Wallet, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface BudgetOverviewProps {
  limit: number;
  spent: number;
}

export function BudgetOverview({ limit, spent }: BudgetOverviewProps) {
  const remaining = limit - spent;
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverBudget = spent > limit;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
      <Card className="md:col-span-2 border-none shadow-sm glass overflow-hidden relative">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Budget</h3>
            <Wallet className="h-5 w-5 text-brand-primary" />
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold font-display">{formatCurrency(spent)}</span>
            <span className="text-muted-foreground text-lg">/ {formatCurrency(limit)}</span>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000 ease-out rounded-full",
                  isOverBudget ? "bg-destructive" : "bg-brand-primary"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className={cn(isOverBudget ? "text-destructive" : "text-brand-primary")}>
                {percentage.toFixed(1)}% used
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(remaining)} remaining
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-none shadow-sm glass">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="p-2 w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Avg. Daily</p>
            <p className="text-2xl font-bold font-display">{formatCurrency(spent / 10)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm glass">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className={cn(
            "p-2 w-10 h-10 rounded-xl flex items-center justify-center mb-4",
            isOverBudget ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          )}>
            {isOverBudget ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
            <p className={cn(
              "text-xl font-bold font-display",
              isOverBudget ? "text-red-600" : "text-green-600"
            )}>
              {isOverBudget ? "Over Budget" : "On Track"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
