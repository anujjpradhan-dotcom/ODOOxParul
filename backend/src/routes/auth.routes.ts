import { Router } from 'express';
import { postSignup, postLogin, postRefresh, postLogout, getMe } from '../controllers/auth.controller';
import { signupSchema, loginSchema, refreshSchema } from '../validators/auth.validator';
import { validate, authLimiter, authenticate } from '../middleware';

const router = Router();

router.post('/signup', authLimiter, validate(signupSchema, 'body'), postSignup);
router.post('/login', authLimiter, validate(loginSchema, 'body'), postLogin);
router.post('/refresh', validate(refreshSchema, 'body'), postRefresh);
router.post('/logout', authenticate, postLogout);
router.get('/me', authenticate, getMe);

export default router;
