"use client";

import { Trash2, Edit2, Plus, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/types";

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Transport": return "bg-blue-100 text-blue-600";
      case "Accommodation": return "bg-purple-100 text-purple-600";
      case "Food": return "bg-amber-100 text-amber-600";
      case "Activities": return "bg-green-100 text-green-600";
      case "Shopping": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="font-bold text-xl font-display">Recent Expenses</h3>
        <Button className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 h-10 gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {format(new Date(expense.date), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={cn("border-none rounded-lg font-bold", getCategoryColor(expense.category))}>
                      {expense.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No expenses recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
