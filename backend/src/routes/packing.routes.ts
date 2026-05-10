import { Router } from 'express';
import { getPackingList, addPackingItem, bulkAddPackingItems, togglePacked, deletePackingItem, resetPackingList, getPackingSuggestions } from '../controllers/packing.controller';
import { createPackingItemSchema, bulkCreatePackingSchema } from '../validators/packing.validator';
import { validate, authenticate } from '../middleware';

const router = Router({ mergeParams: true }); // /api/trips/:id/packing

router.get('/', authenticate, getPackingList);
router.post('/', authenticate, validate(createPackingItemSchema, 'body'), addPackingItem);
router.post('/bulk', authenticate, validate(bulkCreatePackingSchema, 'body'), bulkAddPackingItems);
router.put('/:itemId/toggle', authenticate, togglePacked);
router.delete('/:itemId', authenticate, deletePackingItem);
router.post('/reset', authenticate, resetPackingList);
router.get('/suggestions', authenticate, getPackingSuggestions);

export default router;
