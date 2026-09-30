import { ApiError, tokenStorage } from '@shared/api'
import { getCurrentUser } from '../api/get-current-user'
import { useSessionStore } from './store'

export async function restoreSession(): Promise<void> {
	if (!tokenStorage.getTokens()) return

	try {
		const user = await getCurrentUser()
		useSessionStore.getState().setSession(user)
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			tokenStorage.clearTokens()
		}
	}
}
