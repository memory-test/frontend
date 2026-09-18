import { create } from 'zustand'
import type { IUser } from './types'

interface ISessionState {
	user: IUser | null
	setSession: (user: IUser) => void
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	setSession: (user) => set({ user }),
}))
