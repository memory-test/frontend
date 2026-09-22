import type { ITokens } from '@shared/api'
import { tokenStorage } from '@shared/api'
import { getCurrentUser } from '../api/get-current-user'
import { useSessionStore } from './store'

export async function startSession(tokens: ITokens): Promise<void> {
	tokenStorage.setTokens(tokens)

	const user = await getCurrentUser()
	useSessionStore.getState().setSession(user)
}
