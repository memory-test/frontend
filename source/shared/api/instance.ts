import ky from 'ky'
import { apiConfig } from './config'
import { isTokenExpired } from './jwt'
import { refreshAccessToken } from './refresh-token'
import { notifySessionExpired } from './session-events'
import { tokenStorage } from './token-storage'

async function getFreshAccessToken(): Promise<string | null> {
	try {
		const refreshed = await refreshAccessToken()
		tokenStorage.setTokens(refreshed)
		return refreshed.access
	} catch {
		tokenStorage.clearTokens()
		notifySessionExpired()
		return null
	}
}

export const apiClient = ky.create({
	prefix: apiConfig.baseUrl,
	timeout: apiConfig.timeout,
	headers: {
		Accept: 'application/json',
	},
	hooks: {
		beforeRequest: [
			async ({ request }) => {
				const tokens = tokenStorage.getTokens()
				if (!tokens) return

				const access = isTokenExpired(tokens.access)
					? await getFreshAccessToken()
					: tokens.access
				if (access) request.headers.set('Authorization', `Bearer ${access}`)
			},
		],
		afterResponse: [
			async ({ request, response, retryCount }) => {
				const wasRejectedWithOurToken =
					response.status === 401 && request.headers.has('Authorization')
				if (!wasRejectedWithOurToken || retryCount > 0) return

				const access = await getFreshAccessToken()
				if (!access) return

				const headers = new Headers(request.headers)
				headers.set('Authorization', `Bearer ${access}`)
				return ky.retry({ request: new Request(request, { headers }) })
			},
		],
	},
})
