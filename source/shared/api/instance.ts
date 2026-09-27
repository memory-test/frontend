import ky from 'ky'
import { apiConfig } from './config'
import { isTokenExpired } from './jwt'
import { refreshAccessToken } from './refresh-token'
import { tokenStorage } from './token-storage'

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

				if (!isTokenExpired(tokens.access)) {
					request.headers.set('Authorization', `Bearer ${tokens.access}`)
					return
				}

				try {
					const refreshed = await refreshAccessToken()
					tokenStorage.setTokens(refreshed)
					request.headers.set('Authorization', `Bearer ${refreshed.access}`)
				} catch {
					tokenStorage.clearTokens()
				}
			},
		],
	},
})
