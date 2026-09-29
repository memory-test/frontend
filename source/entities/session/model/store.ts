import { create } from 'zustand'
import type { IUser } from './types'

interface ISessionState {
	user: IUser | null
	setSession: (user: IUser) => void
	clearSession: () => void
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	setSession: (user) => set({ user }),
	clearSession: () => set({ user: null }),
}))
