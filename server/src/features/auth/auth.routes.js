import express from 'express';
import { googleLoginHandler, refreshTokenHandler, logoutHandler, getUserDetailsHandler } from './auth.controller.js';

const router = express.Router();

router.post('/google-login', googleLoginHandler);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logoutHandler);
router.get('/user/:userId', getUserDetailsHandler);

export default router;
