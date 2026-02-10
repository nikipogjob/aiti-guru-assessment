import { create } from 'zustand';
import { clearToken, readToken } from '../lib/token-storage';


type AuthState = {
    token: string | null;
    setToken: (token: string | null) => void;
    initFromStorage: () => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: (token) => set({ token }),

    initFromStorage: () => {
        const token = readToken();
        set({ token });
    },

    logout: () => {
        clearToken();
        set({ token: null });
    }
}));
