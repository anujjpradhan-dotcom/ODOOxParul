import { Request, Response, NextFunction } from 'express';
import * as packingService from '../services/packing.service';
import { successResponse } from '../utils/response';

export const getPackingList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await packingService.getPackingList(req.user!.id, req.params.id);
    return successResponse(res, result, 'Packing list retrieved successfully');
  } catch (error) { next(error); }
};

export const addPackingItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await packingService.addPackingItem(req.user!.id, req.params.id, req.body);
    return successResponse(res, result, 'Item added successfully', 201);
  } catch (error) { next(error); }
};

export const bulkAddPackingItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await packingService.bulkAddPackingItems(req.user!.id, req.params.id, req.body.items);
    return successResponse(res, result, 'Items added successfully', 201);
  } catch (error) { next(error); }
};

export const togglePacked = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await packingService.togglePacked(req.user!.id, req.params.id, req.params.itemId);
    return successResponse(res, result, 'Item toggled successfully');
  } catch (error) { next(error); }
};

export const deletePackingItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await packingService.deletePackingItem(req.user!.id, req.params.id, req.params.itemId);
    return res.status(204).send();
  } catch (error) { next(error); }
};

export const resetPackingList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await packingService.resetPackingList(req.user!.id, req.params.id);
    return successResponse(res, null, 'Packing list reset successfully');
  } catch (error) { next(error); }
};

export const getPackingSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await packingService.getPackingSuggestions(req.params.id);
    return successResponse(res, result, 'Suggestions retrieved successfully');
  } catch (error) { next(error); }
};
