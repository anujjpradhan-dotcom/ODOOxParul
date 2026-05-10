import { Router } from 'express';
import { searchCities, getCityDetails, getPopularCities, getRecommendedCities } from '../controllers/search.controller';
import { citySearchSchema } from '../validators/search.validator';
import { validate, authenticate, optionalAuth } from '../middleware';

const router = Router();

router.get('/', optionalAuth, validate(citySearchSchema, 'query'), searchCities);
router.get('/popular', getPopularCities);
router.get('/recommended', authenticate, getRecommendedCities);
router.get('/:id', getCityDetails);

export default router;
