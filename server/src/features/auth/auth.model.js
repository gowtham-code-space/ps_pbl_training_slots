import db from '../../config/db.js';

export const getUserByEmail = async (email) => {
	const query = `
		SELECT
			u.user_id,
			u.role_id,
			u.email,
			u.refresh_hash,
			u.is_active,
			u.last_login_at,
			u.created_at,
			u.updated_at,
			r.role_name
		FROM users u
		LEFT JOIN role_entities r ON u.role_id = r.role_id
		WHERE u.email = ?
		LIMIT 1
	`;

	const [rows] = await db.execute(query, [email]);
	return rows?.[0] ?? null;
};

export const getStudentByUserId = async (userId) => {
	const query = `SELECT reg_num, name FROM students WHERE user_id = ? LIMIT 1`;
	const [rows] = await db.execute(query, [userId]);
	return rows?.[0] ?? null;
};

export const getUserById = async (userId) => {
	const query = `
		SELECT
			u.user_id,
			u.role_id,
			u.email,
			u.refresh_hash,
			u.is_active,
			u.last_login_at,
			u.created_at,
			u.updated_at,
			r.role_name
		FROM users u
		LEFT JOIN role_entities r ON u.role_id = r.role_id
		WHERE u.user_id = ?
		LIMIT 1
	`;

	const [rows] = await db.execute(query, [userId]);
	return rows?.[0] ?? null;
};

export const updateLastLoginAt = async (userId) => {
	const query = `UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE user_id = ?`;
	const [result] = await db.execute(query, [userId]);
	return (result?.affectedRows ?? 0) > 0;
};

export const storeRefreshTokenHash = async (userId, tokenHash) => {
	const query = `UPDATE users SET refresh_hash = ?, updated_at = NOW() WHERE user_id = ?`;
	const [result] = await db.execute(query, [tokenHash, userId]);
	return (result?.affectedRows ?? 0) > 0;
};

export const getRefreshTokenHash = async (userId) => {
	const query = `SELECT refresh_hash FROM users WHERE user_id = ? LIMIT 1`;
	const [rows] = await db.execute(query, [userId]);
	return rows?.[0]?.refresh_hash ?? null;
};

export const clearRefreshTokenHash = async (userId) => {
	const query = `UPDATE users SET refresh_hash = NULL, updated_at = NOW() WHERE user_id = ?`;
	const [result] = await db.execute(query, [userId]);
	return (result?.affectedRows ?? 0) > 0;
};

export const getRoleEntities = async () => {
	const query = `SELECT role_id, role_name FROM role_entities ORDER BY role_id ASC`;
	const [rows] = await db.execute(query);
	return rows ?? [];
};

export const getRoleMap = async () => {
	const rows = await getRoleEntities();
	return rows.reduce((acc, row) => {
		if (row?.role_name != null && row?.role_id != null) {
			acc[String(row.role_name)] = Number(row.role_id);
		}
		return acc;
	}, {});
};
