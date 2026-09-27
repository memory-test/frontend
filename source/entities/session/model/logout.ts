import { tokenStorage } from '@shared/api'
import { useSessionStore } from './store'

export function logout(): void {
	tokenStorage.clearTokens()
	useSessionStore.getState().clearSession()
}
