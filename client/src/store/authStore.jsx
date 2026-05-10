import { create } from 'zustand';

// Memory-only auth store (no persistence)
export const useAuthStore = create((set) => ({
    accessToken: null,
    user: null,
    roles: null,

    setAccessToken: (token) => set({ accessToken: token }),
    
    setUser: (user) => set({ user }),

    setRoles: (roles) => set({ roles }),

    logout: () => set({ accessToken: null, user: null, roles: null }),
}));
