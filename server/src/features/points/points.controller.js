import { successResponse, internalServerErrorResponse } from '../../utils/response.js';
import * as pointsService from './points.services.js';

export const getRewardPointsRankingHandler = async (req, res) => {
	try {
		const { dept, course, year, search, limit, offset } = req.query;
		const data = await pointsService.getRewardPointsRanking({
			course: course ?? dept,
			year,
			search,
			limit,
			offset,
		});
		return successResponse(res, 'Reward points ranking fetched', { items: data });
	} catch (error) {
		console.error('Error in getRewardPointsRankingHandler:', error);
		return internalServerErrorResponse(res, error.message || 'Failed to fetch reward points ranking');
	}
};

export const getActivityPointsRankingHandler = async (req, res) => {
	try {
		const { dept, course, year, search, limit, offset } = req.query;
		const data = await pointsService.getActivityPointsRanking({
			course: course ?? dept,
			year,
			search,
			limit,
			offset,
		});
		return successResponse(res, 'Activity points ranking fetched', { items: data });
	} catch (error) {
		console.error('Error in getActivityPointsRankingHandler:', error);
		return internalServerErrorResponse(res, error.message || 'Failed to fetch activity points ranking');
	}
};

export const getGroupAverageRankingHandler = async (req, res) => {
	try {
		const { search, limit, offset } = req.query;
		const data = await pointsService.getGroupAverageRanking({ search, limit, offset });
		return successResponse(res, 'Group average ranking fetched', { items: data });
	} catch (error) {
		console.error('Error in getGroupAverageRankingHandler:', error);
		return internalServerErrorResponse(res, error.message || 'Failed to fetch group average ranking');
	}
};

export const getStudentTransactionsHandler = async (req, res) => {
	try {
		const { regNum } = req.params;
		const data = await pointsService.getStudentTransactions(regNum);
		return successResponse(res, 'Student transactions fetched', { items: data });
	} catch (error) {
		console.error('Error in getStudentTransactionsHandler:', error);
		return internalServerErrorResponse(res, error.message || 'Failed to fetch student transactions');
	}
};

export const getGroupMembersPointsHandler = async (req, res) => {
	try {
		const { groupId } = req.params;
		const data = await pointsService.getGroupMembersPoints(groupId);
		return successResponse(res, 'Group members points fetched', { items: data });
	} catch (error) {
		console.error('Error in getGroupMembersPointsHandler:', error);
		return internalServerErrorResponse(res, error.message || 'Failed to fetch group members points');
	}
};

