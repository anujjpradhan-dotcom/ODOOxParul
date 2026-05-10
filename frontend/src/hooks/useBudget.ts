import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export interface BudgetSummary {
  totalEstimated: number;
  totalActual: number;
  budgetLimit: number | null;
  isOverBudget: boolean;
  breakdown: Record<string, { estimated: number; actual: number }>;
  averageDailyCost: number;
}

export function useBudget(tripId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<BudgetSummary | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const response = await api.get<BudgetSummary>(API_ENDPOINTS.BUDGET.SUMMARY(tripId));
      setSummary(response.data);
    } catch (error: any) {
      toast.error("Failed to fetch budget summary");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  const addExpense = async (stopId: string, data: any) => {
    setIsLoading(true);
    try {
      // Normalize payload
      const payload = {
        category: data.category,
        description: data.description.trim(),
        amount: Number(data.amount),
        currency: data.currency || "USD",
        date: new Date(data.date).toISOString(),
      };

      const response = await api.post(API_ENDPOINTS.BUDGET.ADD_EXPENSE(tripId, stopId), payload);
      toast.success("Expense added");
      await fetchSummary(); // Refresh summary
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to add expense");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    summary,
    isLoading,
    fetchSummary,
    addExpense,
  };
}
