import express from 'express';
import { googleLoginHandler, refreshTokenHandler, logoutHandler, getUserDetailsHandler, getRolesHandler } from './auth.controller.js';

const router = express.Router();

router.post('/google-login', googleLoginHandler);
router.get('/roles', getRolesHandler);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logoutHandler);
router.get('/user/:userId', getUserDetailsHandler);

export default router;
