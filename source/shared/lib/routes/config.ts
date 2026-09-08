import { defineRoute } from './utils/define-route'

// Route segments
export const routeSegments = {
	auth: 'auth',
	forgotPassword: 'forgot-password',
	recoveryPassword: 'recovery-password',
	register: 'register',
	profile: 'profile',
	profileEdit: 'edit',
	progress: 'progress',
	catalog: 'catalog',
	exercise: ':id',
	exerciseProcess: 'process',
	exerciseResult: 'result',
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
	register: defineRoute([routeSegments.register]),
	profile: defineRoute([routeSegments.profile]),
	profileEdit: defineRoute([routeSegments.profile, routeSegments.profileEdit]),
	progress: defineRoute([routeSegments.progress]),
	catalog: defineRoute([routeSegments.catalog]),
	exercise: defineRoute([routeSegments.catalog, routeSegments.exercise]),
	exerciseProcess: defineRoute([
		routeSegments.catalog,
		routeSegments.exercise,
		routeSegments.exerciseProcess,
	]),
	exerciseResult: defineRoute([
		routeSegments.catalog,
		routeSegments.exercise,
		routeSegments.exerciseResult,
	]),
}
