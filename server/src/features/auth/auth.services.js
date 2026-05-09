import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken, hashRefreshToken, compareRefreshToken } from '../utils/jwt.js';
import * as authModel from './auth.model.js';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const issueSessionForEmail = async (email, nameFallback = '') => {
    if (!email) {
        throw new Error('Email not found in credential');
    }

    let user = await authModel.getUserByEmail(email);
    let isNewUser = false;

    if (!user) {
        const defaultName = nameFallback || email.split('@')[0] || 'New User';
        const newUserResult = await authModel.createUserFromGoogle(email, defaultName);
        user = await authModel.getUserById(newUserResult.user_id);
        isNewUser = true;
    }

    const tokenPayload = {
        user_id: user.user_id,
        role_id: user.role_id
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    const refreshTokenHash = hashRefreshToken(refreshToken);
    await authModel.storeRefreshTokenHash(user.user_id, refreshTokenHash);

    return {
        success: true,
        message: 'Login successful',
        accessToken,
        refreshToken,
        isNewUser,
        user: {
            user_id: user.user_id,
            role_id: user.role_id,
            name: user.name,
            gmail: user.gmail,
            role_name: user.role_name,
            business_id: user.business_id,
            branch_id: user.branch_id,
            entity_id: user.entity_id || null
        }
    };
};

export const verifyGoogleToken = async (credential) => {
    try {
        // Development fallback for mobile email-based login flow.
        // In production, require a valid Google ID token.
        const looksLikeEmail = typeof credential === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential);
        if (looksLikeEmail) {
            if (process.env.NODE_ENV === 'production') {
                throw new Error('Invalid Google credential');
            }
            return issueSessionForEmail(credential);
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;
        return issueSessionForEmail(email, name);
    } catch (error) {
        console.error('Error verifying Google token:', error);
        throw error;
    }
};

export const refreshAccessToken = async (refreshToken, user) => {
    try {
        const storedHash = await authModel.getRefreshTokenHash(user.user_id);
        if (!storedHash) {
            throw new Error('No active session found. Please login again.');
        }
        if (!compareRefreshToken(refreshToken, storedHash)) {
            throw new Error('Session expired. You have been logged in from another device.');
        }

        const payload = {
            user_id: user.user_id,
            role_id: user.role_id
        };

        const newAccessToken = generateAccessToken(payload);

        return {
            success: true,
            message: 'Token refreshed successfully',
            accessToken: newAccessToken,    
            refreshToken: refreshToken
        };
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export const logout = async (userId) => {
    try {
        await authModel.clearRefreshTokenHash(userId);

        return {
            success: true,
            message: 'Logged out successfully'
        };
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};
