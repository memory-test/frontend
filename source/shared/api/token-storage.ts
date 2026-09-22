import { isTokenExpired } from './jwt'
import type { ITokens } from './types'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

function isBrowser(): boolean {
	return typeof window !== 'undefined'
}

export const tokenStorage = {
	getTokens(): ITokens | null {
		if (!isBrowser()) return null

		const access = localStorage.getItem(ACCESS_TOKEN_KEY)
		const refresh = localStorage.getItem(REFRESH_TOKEN_KEY)

		if (!access || !refresh) return null
		if (isTokenExpired(access)) return null

		return { access, refresh }
	},

	setTokens(tokens: ITokens): void {
		if (!isBrowser()) return

		localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access)
		localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh)
	},

	clearTokens(): void {
		if (!isBrowser()) return

		localStorage.removeItem(ACCESS_TOKEN_KEY)
		localStorage.removeItem(REFRESH_TOKEN_KEY)
	},
}
