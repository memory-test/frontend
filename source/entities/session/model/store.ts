import type { ITokens } from '@shared/api'
import { tokenStorage } from '@shared/api'
import { create } from 'zustand'
import type { IUser } from './types'

interface ISessionState {
	user: IUser | null
	setSession: (tokens: ITokens, user: IUser) => void
	clearSession: () => void
}

export const useSessionStore = create<ISessionState>((set) => ({
	user: null,
	setSession: (tokens, user) => {
		tokenStorage.setTokens(tokens)
		set({ user })
	},
	clearSession: () => {
		tokenStorage.clearTokens()
		set({ user: null })
	},
}))
