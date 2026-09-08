import ky from 'ky'
import { apiConfig } from './config'

export const apiClient = ky.create({
	prefix: apiConfig.baseUrl,
	timeout: apiConfig.timeout,
	headers: {
		Accept: 'application/json',
	},
	hooks: {
		beforeRequest: [
			({ request }) => {
				if (typeof window !== 'undefined') {
					const token = localStorage.getItem('accessToken')
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`)
					}
				}
			},
		],
	},
})
