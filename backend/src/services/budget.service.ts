import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';
import { ExpenseCategory } from '@prisma/client';
import { getTripById } from './trip.service';

export const getTripBudgetSummary = async (userId: string, tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      stops: {
        include: {
          expenses: true,
        },
      },
    },
  });

  if (!trip) throw new AppError('Trip not found', 404);
  if (trip.userId !== userId && !trip.isPublic) {
    throw new AppError('Unauthorized', 403);
  }

  const allExpenses = trip.stops.flatMap(stop => stop.expenses);
  const totalActual = allExpenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLimit = trip.totalBudget || null;
  const isOverBudget = budgetLimit ? totalActual > budgetLimit : false;

  const breakdown = {
    transport: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.TRANSPORT).reduce((s, e) => s + e.amount, 0) },
    accommodation: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.ACCOMMODATION).reduce((s, e) => s + e.amount, 0) },
    food: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.FOOD).reduce((s, e) => s + e.amount, 0) },
    activities: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.ACTIVITY).reduce((s, e) => s + e.amount, 0) },
    shopping: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.SHOPPING).reduce((s, e) => s + e.amount, 0) },
    miscellaneous: { estimated: 0, actual: allExpenses.filter(e => e.category === ExpenseCategory.MISCELLANEOUS).reduce((s, e) => s + e.amount, 0) },
  };

  return {
    totalEstimated: 0,
    totalActual,
    budgetLimit,
    isOverBudget,
    breakdown,
    averageDailyCost: totalActual > 0 ? totalActual / 1 : 0, // Simplified
  };
};

export const addExpense = async (userId: string, tripId: string, stopId: string, data: any) => {
  await getTripById(userId, tripId);
  
  const expense = await prisma.expense.create({
    data: {
      tripStopId: stopId,
      category: data.category as ExpenseCategory,
      description: data.description,
      amount: data.amount,
      currency: data.currency || 'USD',
      date: new Date(data.date),
    },
  });

  return expense;
};

export const updateExpense = async (userId: string, tripId: string, expenseId: string, data: any) => {
  await getTripById(userId, tripId);

  const expense = await prisma.expense.findUnique({ where: { id: expenseId } });
  if (!expense) throw new AppError('Expense not found', 404);

  const updatedExpense = await prisma.expense.update({
    where: { id: expenseId },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
  });

  return updatedExpense;
};

export const deleteExpense = async (userId: string, tripId: string, expenseId: string) => {
  await getTripById(userId, tripId);

  await prisma.expense.delete({ where: { id: expenseId } });
};

export const getStopExpenses = async (userId: string, tripId: string, stopId: string) => {
  await getTripById(userId, tripId);
  
  return prisma.expense.findMany({
    where: { tripStopId: stopId },
    orderBy: { date: 'desc' },
  });
};
