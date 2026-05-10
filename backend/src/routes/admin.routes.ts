import { Router } from 'express';
import { getDashboardStats, getAllUsers, getUserDetails, getTripsAnalytics, getTopCities, getTopActivities, getPlatformMetrics } from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middleware';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.get('/analytics/trips', getTripsAnalytics);
router.get('/analytics/cities', getTopCities);
router.get('/analytics/activities', getTopActivities);
router.get('/metrics', getPlatformMetrics);

export default router;
