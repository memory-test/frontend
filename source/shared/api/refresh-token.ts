import ky from 'ky'
import { apiConfig } from './config'
import { normalizeError } from './normalize-error'
import { tokenStorage } from './token-storage'
import type { ITokens } from './types'

interface ITokenRefreshResponse {
	access: string
	refresh?: string
}

let pendingRefresh: Promise<ITokens> | null = null

async function requestNewTokens(refresh: string): Promise<ITokens> {
	try {
		const response = await ky
			.post('auth/jwt/refresh/', {
				prefix: apiConfig.baseUrl,
				timeout: apiConfig.timeout,
				json: { refresh },
			})
			.json<ITokenRefreshResponse>()

		return { access: response.access, refresh: response.refresh ?? refresh }
	} catch (error) {
		throw normalizeError(error)
	}
}

export function refreshAccessToken(): Promise<ITokens> {
	if (pendingRefresh) return pendingRefresh

	const tokens = tokenStorage.getTokens()
	if (!tokens) return Promise.reject(new Error('No refresh token available'))

	pendingRefresh = requestNewTokens(tokens.refresh).finally(() => {
		pendingRefresh = null
	})

	return pendingRefresh
}
