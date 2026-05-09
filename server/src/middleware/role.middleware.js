import { forbiddenResponse } from '../utils/response.js';

export const requireRole = (...requiredRoleIds) => {
    const allowedRoleIds = requiredRoleIds.flat().map(Number).filter((roleId) => !Number.isNaN(roleId));

    return (req, res, next) => {
        if (!req.user?.role_id) {
            return forbiddenResponse(res, 'User role not found');
        }

        if (allowedRoleIds.length === 0) {
            return forbiddenResponse(res, 'No role permissions configured');
        }

        if (!allowedRoleIds.includes(Number(req.user.role_id))) {
            return forbiddenResponse(res, 'Insufficient permissions');
        }

        next();
    };
};
