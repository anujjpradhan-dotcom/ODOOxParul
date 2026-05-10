import { Router } from 'express';
import authRoutes from './auth.routes';
import { tripRouter, publicTripRouter } from './trip.routes';
import stopRoutes from './stop.routes';
import cityRoutes from './city.routes';
import { activityRouter, tripActivityRouter } from './activity.routes';
import { getActivitiesByCity } from '../controllers/search.controller';
import { budgetTripRouter, budgetStopExpenseRouter, budgetExpenseRouter } from './budget.routes';
import packingRoutes from './packing.routes';
import notesRoutes from './notes.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import { API_VERSION } from '../utils/constants';

const router = Router();
const apiV1 = Router();

apiV1.use('/auth', authRoutes);
apiV1.use('/trips/:id/stops/:stopId/activities', tripActivityRouter);
apiV1.use('/trips/:id/stops/:stopId/expenses', budgetStopExpenseRouter);
apiV1.use('/trips/:id/expenses/:expenseId', budgetExpenseRouter);
apiV1.use('/trips/:id/packing', packingRoutes);
apiV1.use('/trips/:id/notes', notesRoutes);
apiV1.use('/trips/:id', budgetTripRouter);
apiV1.use('/trips/:id/stops', stopRoutes);
apiV1.use('/trips', tripRouter);
apiV1.use('/public/trips', publicTripRouter);
apiV1.use('/cities', cityRoutes);
apiV1.get('/cities/:cityId/activities', getActivitiesByCity);
apiV1.use('/activities', activityRouter);
apiV1.use('/users', userRoutes);
apiV1.use('/admin', adminRoutes);

router.use(`/api/${API_VERSION}`, apiV1);

// Backward compatibility or simple alias
router.use('/api', apiV1);

export default router;
