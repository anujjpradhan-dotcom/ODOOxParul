import { Router } from 'express';
import { getBudgetSummary, addExpense, updateExpense, deleteExpense, getStopExpenses } from '../controllers/budget.controller';
import { createExpenseSchema, updateExpenseSchema } from '../validators/budget.validator';
import { validate, authenticate } from '../middleware';

const router = Router({ mergeParams: true });
const tripRouter = Router({ mergeParams: true }); // /api/trips/:id
const stopExpenseRouter = Router({ mergeParams: true }); // /api/trips/:id/stops/:stopId/expenses
const expenseRouter = Router({ mergeParams: true }); // /api/trips/:id/expenses/:expenseId

tripRouter.get('/budget', authenticate, getBudgetSummary);

stopExpenseRouter.post('/', authenticate, validate(createExpenseSchema, 'body'), addExpense);
stopExpenseRouter.get('/', authenticate, getStopExpenses);

expenseRouter.put('/', authenticate, validate(updateExpenseSchema, 'body'), updateExpense);
expenseRouter.delete('/', authenticate, deleteExpense);

export { tripRouter as budgetTripRouter, stopExpenseRouter as budgetStopExpenseRouter, expenseRouter as budgetExpenseRouter };
