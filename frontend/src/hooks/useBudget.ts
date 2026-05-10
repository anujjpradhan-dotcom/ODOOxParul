import { useState } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Expense } from "@/types";
import { toast } from "sonner";

export function useBudget() {
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async (tripId: string) => {
    setIsLoading(true);
    try {
      const response: any = await api.get(API_ENDPOINTS.TRIPS.EXPENSES(tripId));
      setExpenses(response.data || []);
    } catch (error) {
      // toast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (tripId: string, data: any) => {
    try {
      const response: any = await api.post(API_ENDPOINTS.TRIPS.EXPENSES(tripId), data);
      setExpenses(prev => [...prev, response.data]);
      toast.success("Expense added");
      return response.data;
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return {
    expenses,
    isLoading,
    fetchExpenses,
    addExpense,
  };
}
