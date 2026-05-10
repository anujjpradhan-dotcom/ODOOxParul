import { Router } from 'express';
import { getProfile, updateProfile, changePassword, deleteAccount, getSavedDestinations, saveDestination, removeSavedDestination, getDashboard } from '../controllers/user.controller';
import { updateProfileSchema, changePasswordSchema, deleteAccountSchema } from '../validators/user.validator';
import { validate, authenticate } from '../middleware';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate(updateProfileSchema, 'body'), updateProfile);
router.put('/password', authenticate, validate(changePasswordSchema, 'body'), changePassword);
router.delete('/account', authenticate, validate(deleteAccountSchema, 'body'), deleteAccount);
router.get('/saved-destinations', authenticate, getSavedDestinations);
router.post('/saved-destinations/:cityId', authenticate, saveDestination);
router.delete('/saved-destinations/:cityId', authenticate, removeSavedDestination);
router.get('/dashboard', authenticate, getDashboard);

export default router;
