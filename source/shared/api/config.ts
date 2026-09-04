function getBaseUrl(): string {
	const url = process.env.NEXT_PUBLIC_API_BASE_URL

	if (!url) {
		throw new Error(
			'NEXT_PUBLIC_API_BASE_URL is not defined in environment variables',
		)
	}

	return url
}

export const apiConfig = {
	baseUrl: getBaseUrl(),
	timeout: 15000,
} as const
