import { prisma } from '../prisma-client';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors';

export async function getTripBudgetBreakdown(tripId: string) {
  const expenses = await prisma.expense.findMany({
    where: { tripStop: { tripId } }
  });
  
  return expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
}

export async function getStopExpenses(tripStopId: string) {
  return prisma.expense.findMany({ where: { tripStopId } });
}

export async function addExpense(tripStopId: string, data: Omit<Prisma.ExpenseCreateInput, 'tripStop'>) {
  return prisma.expense.create({
    data: {
      ...data,
      tripStop: { connect: { id: tripStopId } }
    }
  });
}

export async function updateExpense(id: string, data: Prisma.ExpenseUpdateInput) {
  return prisma.expense.update({ where: { id }, data });
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({ where: { id } });
}

export async function getDailyAverageCost(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { stops: { include: { expenses: true } } }
  });
  if (!trip) throw new NotFoundError('Trip not found');
  
  const totalExpenses = trip.stops.flatMap(s => s.expenses).reduce((sum, e) => sum + e.amount, 0);
  const days = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
  return totalExpenses / days;
}

export async function getOverBudgetAlerts(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { stops: { include: { expenses: true } } }
  });
  if (!trip) throw new NotFoundError('Trip not found');
  
  if (!trip.totalBudget) return false;
  const totalExpenses = trip.stops.flatMap(s => s.expenses).reduce((sum, e) => sum + e.amount, 0);
  
  return totalExpenses > trip.totalBudget;
}
