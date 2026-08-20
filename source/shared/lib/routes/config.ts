import { defineRoute } from './utils/define-route'

// Route segments
export const routeSegments = {
	auth: 'auth',
	forgotPassword: 'forgot-password',
	recoveryPassword: 'recovery-password',
	profile: 'profile',
} as const

// Query params
export const routeQueryParams = {
	query: 'query',
	pageNumber: 'page',
	perPage: 'per_page',
} as const

// Routes
export const routerPath = {
	auth: defineRoute([routeSegments.auth]),
	forgotPassword: defineRoute([
		routeSegments.auth,
		routeSegments.forgotPassword,
	]),
	recoveryPassword: defineRoute([
		routeSegments.auth,
		routeSegments.recoveryPassword,
	]),

	profile: defineRoute([routeSegments.profile]),
}
