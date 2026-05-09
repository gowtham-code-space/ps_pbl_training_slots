// import pool from '../config/db.js';

// export const getUserByEmail = async (email) => {
//     try {
//         const query = `
//             SELECT u.*, r.role AS role_name 
//             FROM users u
//             LEFT JOIN role r ON u.role_id = r.role_id
//             WHERE u.gmail = ?
//         `;
        
//         const conn = await pool.getConnection();
//         const [rows] = await conn.execute(query, [email]);
//         conn.release();
        
//         return rows.length > 0 ? rows[0] : null;
//     } catch (error) {
//         console.error('Error fetching user by email:', error);
//         throw error;
//     }
// };

// export const createUserFromGoogle = async (email, name) => {
//     try {
//         const conn = await pool.getConnection();
//         const role_id = 1;
        
//         // Create new user
//         const userQuery = `
//             INSERT INTO users 
//             (business_id, branch_id, name, role_id, gmail, phone_number, refresh_token, created_at)
//             VALUES (NULL, NULL, ?, ?, ?, '', '', NOW())
//         `;
        
//         const [result] = await conn.execute(userQuery, [name, role_id, email]);
//         conn.release();
        
//         return { user_id: result.insertId, role_id, success: true };
//     } catch (error) {
//         console.error('Error creating user from Google:', error);
//         throw error;
//     }
// };

// export const getUserById = async (userId) => {
//     try {
//         const query = `
//             SELECT u.*, r.role AS role_name, e.entity_name FROM users u
//             LEFT JOIN role r ON u.role_id = r.role_id
//             LEFT JOIN entity e ON u.entity_id = e.entity_id
//             WHERE u.user_id = ?
//         `;
        
//         const conn = await pool.getConnection();
//         const [rows] = await conn.execute(query, [userId]);
//         conn.release();
        
//         return rows.length > 0 ? rows[0] : null;
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         throw error;
//     }
// };

// export const storeRefreshTokenHash = async (userId, tokenHash) => {
//     try {
//         const query = `UPDATE users SET refresh_token = ? WHERE user_id = ?`;
        
//         const conn = await pool.getConnection();
//         const [result] = await conn.execute(query, [tokenHash, userId]);
//         conn.release();
        
//         return result.affectedRows > 0;
//     } catch (error) {
//         console.error('Error storing refresh token hash:', error);
//         throw error;
//     }
// };

// export const getRefreshTokenHash = async (userId) => {
//     try {
//         const query = `SELECT refresh_token FROM users WHERE user_id = ?`;
        
//         const conn = await pool.getConnection();
//         const [rows] = await conn.execute(query, [userId]);
//         conn.release();
        
//         return rows.length > 0 ? rows[0].refresh_token : null;
//     } catch (error) {
//         console.error('Error fetching refresh token hash:', error);
//         throw error;
//     }
// };

// export const clearRefreshTokenHash = async (userId) => {
//     try {
//         const query = `UPDATE users SET refresh_token = '' WHERE user_id = ?`;
        
//         const conn = await pool.getConnection();
//         const [result] = await conn.execute(query, [userId]);
//         conn.release();
        
//         return result.affectedRows > 0;
//     } catch (error) {
//         console.error('Error clearing refresh token hash:', error);
//         throw error;
//     }
// };
