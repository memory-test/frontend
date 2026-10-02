import { create } from 'zustand'
import type { IUser } from './types'

interface ISessionState {
	user: IUser | null
	setSession: (user: IUser) => void
	updateUser: (patch: Partial<IUser>) => void
	clearSession: () => void
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	setSession: (user) => set({ user }),
	updateUser: (patch) =>
		set((state) =>
			state.user ? { user: { ...state.user, ...patch } } : state,
		),
	clearSession: () => set({ user: null }),
}))
