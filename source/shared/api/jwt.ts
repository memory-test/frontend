interface IJwtPayload {
	exp: number
}

export function isTokenExpired(token: string): boolean {
	const [, payload] = token.split('.')
	if (!payload) return true

	try {
		const { exp } = JSON.parse(atob(payload)) as IJwtPayload
		return Date.now() >= exp * 1000
	} catch {
		return true
	}
}
