import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

interface AuthUser {
    user: null | User;
    setUser: (user: User) => void;
    logoutFromStore: () => void;
}


export const useAuthStore = create<AuthUser>()(
    devtools(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logoutFromStore: () => set({ user: null }),
        })
    )
);