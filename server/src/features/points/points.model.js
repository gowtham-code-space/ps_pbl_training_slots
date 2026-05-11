import db from '../../config/db.js';

const clampLimit = (limit) => {
	const n = Number(limit);
	if (Number.isNaN(n) || n <= 0) return 50;
	return Math.trunc(Math.min(Math.max(n, 1), 200));
};

const clampOffset = (offset) => {
	const n = Number(offset);
	if (Number.isNaN(n) || n < 0) return 0;
	return Math.trunc(n);
};

const buildStudentPointsWhere = ({ course, yearOfStudy, search }) => {
	const where = ['s.is_active = 1'];
	const params = [];

	if (course) {
		where.push('s.course = ?');
		params.push(course);
	}

	if (yearOfStudy != null) {
		where.push('s.year_of_study = ?');
		params.push(Number(yearOfStudy));
	}

	if (search) {
		where.push('(s.reg_num LIKE ? OR s.name LIKE ?)');
		const q = `%${search}%`;
		params.push(q, q);
	}

	return { whereSql: where.length ? `WHERE ${where.join(' AND ')}` : '', params };
};

export const getStudentPointsRanking = async ({ pointType, course, yearOfStudy, search, limit, offset }) => {
	const { whereSql, params } = buildStudentPointsWhere({ course, yearOfStudy, search });
	const lim = clampLimit(limit);
	const off = clampOffset(offset);

	const query = `
		SELECT
			s.student_id,
			s.reg_num,
			s.name,
			s.degree,
			s.course,
			s.year_of_study,
			COALESCE(p.points_available, 0) AS points_available
		FROM students s
		LEFT JOIN points p
			ON p.student_id = s.student_id
		 AND p.point_type = ?
		${whereSql}
		ORDER BY points_available DESC, s.reg_num ASC
		LIMIT ${lim} OFFSET ${off}
	`;

	const [rows] = await db.execute(query, [pointType, ...params]);
	return rows ?? [];
};

export const getGroupAverageRanking = async ({ search, limit, offset }) => {
	const lim = clampLimit(limit);
	const off = clampOffset(offset);

	const where = [];
	const params = [];
	if (search) {
		where.push('(CAST(g.group_id AS CHAR) LIKE ? OR g.group_name LIKE ?)');
		const q = `%${search}%`;
		params.push(q, q);
	}

	const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

	const query = `
		SELECT
			g.group_id,
			g.group_name,
			g.group_type,
			COUNT(gm.member_id) AS member_count,
			SUM(COALESCE(p.points_available, 0)) AS total_points,
			AVG(COALESCE(p.points_available, 0)) AS avg_points
		FROM all_groups g
		JOIN group_members gm ON gm.group_id = g.group_id
		JOIN students s ON s.student_id = gm.student_id AND s.is_active = 1
		LEFT JOIN points p
			ON p.student_id = s.student_id
		 AND p.point_type = 'ACTIVITY_POINTS'
		LEFT JOIN group_roles gr ON gr.group_role_id = gm.group_role_id
		${whereSql}
		GROUP BY g.group_id, g.group_name, g.group_type
		ORDER BY avg_points DESC, total_points DESC, g.group_id ASC
		LIMIT ${lim} OFFSET ${off}
	`;

	const [rows] = await db.execute(query, [...params]);
	return rows ?? [];
};

export const getStudentTransactions = async (regNum) => {
	const query = `
		SELECT
			pt.point_type,
			pt.point_source,
			pt.points_earned,
			pt.created_at
		FROM point_transactions pt
		JOIN students s ON s.student_id = pt.student_id
		WHERE s.reg_num = ?
		ORDER BY pt.created_at DESC
	`;
	const [rows] = await db.execute(query, [regNum]);
	return rows ?? [];
};

export const getGroupMembersPoints = async (groupId) => {
	const query = `
		SELECT
			gm.group_role_id,
			gr.role_name,
			s.reg_num,
			s.name,
			COALESCE(p.points_available, 0) AS points_available
		FROM group_members gm
		JOIN students s ON s.student_id = gm.student_id
		JOIN group_roles gr ON gr.group_role_id = gm.group_role_id
		LEFT JOIN points p ON p.student_id = gm.student_id AND p.point_type = 'ACTIVITY_POINTS'
		WHERE gm.group_id = ?
		ORDER BY gm.group_role_id ASC
	`;
	const [rows] = await db.execute(query, [Number(groupId)]);
	return rows ?? [];
};

