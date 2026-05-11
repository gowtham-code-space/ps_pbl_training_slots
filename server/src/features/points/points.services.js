import * as pointsModel from './points.model.js';

const normalizeStr = (v) => {
	if (v == null) return '';
	const s = String(v).trim();
	return s;
};

const normalizeCourse = (deptOrCourse) => {
	const s = normalizeStr(deptOrCourse);
	return s || null;
};

const normalizeYear = (year) => {
	const s = normalizeStr(year);
	if (!s || s.toUpperCase() === 'ALL') return null;
	const n = Number(s);
	if (!Number.isNaN(n)) return n;
	// allow UI values: 1st/2nd/3rd
	if (s === '1st') return 1;
	if (s === '2nd') return 2;
	if (s === '3rd') return 3;
	return null;
};

const normalizeSearch = (search) => {
	const s = normalizeStr(search);
	return s ? s : null;
};

export const getRewardPointsRanking = async ({ course, year, search, limit, offset }) => {
	return pointsModel.getStudentPointsRanking({
		pointType: 'REWARD_POINTS',
		course: normalizeCourse(course),
		yearOfStudy: normalizeYear(year),
		search: normalizeSearch(search),
		limit,
		offset,
	});
};

export const getActivityPointsRanking = async ({ course, year, search, limit, offset }) => {
	return pointsModel.getStudentPointsRanking({
		pointType: 'ACTIVITY_POINTS',
		course: normalizeCourse(course),
		yearOfStudy: normalizeYear(year),
		search: normalizeSearch(search),
		limit,
		offset,
	});
};

export const getGroupAverageRanking = async ({ search, limit, offset }) => {
	return pointsModel.getGroupAverageRanking({
		search: normalizeSearch(search),
		limit,
		offset,
	});
};

export const getStudentTransactions = async (regNum) => {
	return pointsModel.getStudentTransactions(normalizeStr(regNum));
};

export const getGroupMembersPoints = async (groupId) => {
	return pointsModel.getGroupMembersPoints(groupId);
};

