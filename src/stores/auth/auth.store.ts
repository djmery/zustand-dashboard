import { StateCreator } from 'zustand';
import type { User, AuthStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { AuthService } from '../../services/auth.service';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User

    loginUser: (email: string, password: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logoutUser: () => void;
}

//los parénteis es porque es un retorno implicito de un objeto (set) => ({})
export const storeApi: StateCreator<AuthState> = (set) => ({

    status: 'pending',
    token: undefined,
    user: undefined,

    loginUser: async (email, password) => {

        try {
            const { token, ...user } = await AuthService.login(email, password);
            set({ status: 'authorized', token, user })

        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined });
            throw 'Unauthorized';
        }
    },

    checkAuthStatus: async () => {
        try {
            const { token, ...user } = await AuthService.checkStatus();
            set({ status: 'authorized', token, user });

        } catch (error) {
            console.log(error);
            set({ status: 'unauthorized', token: undefined, user: undefined })
        }
    },
    logoutUser: () => {
        set({ status: 'unauthorized', token: undefined, user: undefined })
    }

})

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-storage' }
        )
    )
)
