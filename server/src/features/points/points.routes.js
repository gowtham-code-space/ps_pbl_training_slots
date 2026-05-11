import express from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';
import {
	getRewardPointsRankingHandler,
	getActivityPointsRankingHandler,
	getGroupAverageRankingHandler,
	getStudentTransactionsHandler,
	getGroupMembersPointsHandler,
} from './points.controller.js';

const router = express.Router();

// Student-only access (role_id = 1)
router.use(authMiddleware, requireRole(1));

router.get('/reward', getRewardPointsRankingHandler);
router.get('/activity/individual', getActivityPointsRankingHandler);
router.get('/activity/groups', getGroupAverageRankingHandler);
router.get('/transactions/student/:regNum', getStudentTransactionsHandler);
router.get('/activity/groups/:groupId/members', getGroupMembersPointsHandler);

export default router;

