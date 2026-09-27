import ky from 'ky'
import { apiConfig } from './config'
import { isTokenExpired } from './jwt'
import { tokenStorage } from './token-storage'

export const apiClient = ky.create({
	prefix: apiConfig.baseUrl,
	timeout: apiConfig.timeout,
	headers: {
		Accept: 'application/json',
	},
	hooks: {
		beforeRequest: [
			({ request }) => {
				const tokens = tokenStorage.getTokens()
				if (tokens && !isTokenExpired(tokens.access)) {
					request.headers.set('Authorization', `Bearer ${tokens.access}`)
				}
			},
		],
	},
})
