import { ApiError, tokenStorage } from '@shared/api'
import { getCurrentUser } from '../api/get-current-user'
import { useSessionStore } from './store'

export async function restoreSession(): Promise<void> {
	if (!tokenStorage.getTokens()) {
		// Если токенов нет, сразу сбрасываем флаг инициализации
		useSessionStore.getState().setInitializing(false)
		return
	}

	try {
		const user = await getCurrentUser()
		// setSession внутри себя автоматически сбросит isInitializing в false
		useSessionStore.getState().setSession(user)
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			tokenStorage.clearTokens()
		}
		// Критически важно: даже при ошибке сбрасываем флаг,
		// чтобы приложение не застряло в состоянии "вечной загрузки"
		useSessionStore.getState().setInitializing(false)
	}
}
