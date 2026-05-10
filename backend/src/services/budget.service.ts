import { AppError } from '../middleware/error.middleware';
import { getTripById } from './trip.service';

export interface Expense {
  id: string;
  tripId: string;
  stopId: string;
  category: 'TRANSPORT' | 'ACCOMMODATION' | 'FOOD' | 'ACTIVITIES' | 'SHOPPING' | 'MISCELLANEOUS';
  description: string;
  amount: number;
  currency: string;
  date: string;
}

const MOCK_EXPENSES: Expense[] = [];

export const getTripBudgetSummary = async (userId: string, tripId: string) => {
  const trip = await getTripById(userId, tripId);
  const tripExpenses = MOCK_EXPENSES.filter(e => e.tripId === tripId);

  const totalActual = tripExpenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLimit = trip.totalBudget || null;
  const isOverBudget = budgetLimit ? totalActual > budgetLimit : false;

  const breakdown = {
    transport: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'TRANSPORT').reduce((s, e) => s + e.amount, 0) },
    accommodation: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'ACCOMMODATION').reduce((s, e) => s + e.amount, 0) },
    food: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'FOOD').reduce((s, e) => s + e.amount, 0) },
    activities: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'ACTIVITIES').reduce((s, e) => s + e.amount, 0) },
    shopping: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'SHOPPING').reduce((s, e) => s + e.amount, 0) },
    miscellaneous: { estimated: 0, actual: tripExpenses.filter(e => e.category === 'MISCELLANEOUS').reduce((s, e) => s + e.amount, 0) },
  };

  return {
    totalEstimated: 0, // Placeholder
    totalActual,
    budgetLimit,
    isOverBudget,
    breakdown,
    perDay: [],
    averageDailyCost: totalActual > 0 ? totalActual / 1 : 0, // Simplified
    overBudgetDays: [],
  };
};

export const addExpense = async (userId: string, tripId: string, stopId: string, data: any) => {
  await getTripById(userId, tripId);
  
  const expense: Expense = {
    ...data,
    id: 'cuid_' + Math.random().toString(36).substring(7),
    tripId,
    stopId,
  };

  MOCK_EXPENSES.push(expense);
  return expense;
};

export const updateExpense = async (userId: string, tripId: string, expenseId: string, data: any) => {
  await getTripById(userId, tripId);

  const index = MOCK_EXPENSES.findIndex(e => e.id === expenseId && e.tripId === tripId);
  if (index === -1) throw new AppError('Expense not found', 404);

  const updatedExpense = { ...MOCK_EXPENSES[index], ...data };
  MOCK_EXPENSES[index] = updatedExpense;
  return updatedExpense;
};

export const deleteExpense = async (userId: string, tripId: string, expenseId: string) => {
  await getTripById(userId, tripId);

  const index = MOCK_EXPENSES.findIndex(e => e.id === expenseId && e.tripId === tripId);
  if (index === -1) throw new AppError('Expense not found', 404);

  MOCK_EXPENSES.splice(index, 1);
};

export const getStopExpenses = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId);
  return MOCK_EXPENSES.filter(e => e.stopId === stopId && e.tripId === tripId);
};
