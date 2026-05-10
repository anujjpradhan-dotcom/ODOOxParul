import { Request, Response, NextFunction } from 'express';
import * as budgetService from '../services/budget.service';
import { successResponse } from '../utils/response';

export const getBudgetSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await budgetService.getTripBudgetSummary(req.user!.id, req.params.id);
    return successResponse(res, result, 'Budget summary retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const addExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params;
    const result = await budgetService.addExpense(req.user!.id, tripId, stopId, req.body);
    return successResponse(res, result, 'Expense added successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, expenseId } = req.params;
    const result = await budgetService.updateExpense(req.user!.id, tripId, expenseId, req.body);
    return successResponse(res, result, 'Expense updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, expenseId } = req.params;
    await budgetService.deleteExpense(req.user!.id, tripId, expenseId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getStopExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tripId, stopId } = req.params;
    const result = await budgetService.getStopExpenses(req.user!.id, tripId, stopId);
    return successResponse(res, result, 'Stop expenses retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};
