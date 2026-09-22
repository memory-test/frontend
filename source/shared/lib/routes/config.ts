import { defineRoute } from './utils/define-route'

// Route segments (ТОЛЬКО атомарные части URL)
export const routeSegments = {
	auth: 'auth',
	forgotPassword: 'forgot-password',
	recoveryPassword: 'recovery-password',
	confirm: 'confirm',
	register: 'register',
	profile: 'profile',
	profileEdit: 'edit',
	progress: 'progress',
	catalog: 'catalog',
	exercise: ':id',
	exerciseProcess: 'process',
	exerciseResult: 'result',
	settings: 'settings',
} as const

// Query params
export const routeQueryParams = {
	query: 'query',
	pageNumber: 'page',
	perPage: 'per_page',
} as const

// Routes (Композиция сегментов)
export const routerPath = {
	home: defineRoute([]), // Корень

	// Группа Auth: собирается из атомарных сегментов
	auth: defineRoute([routeSegments.auth]),
	forgotPassword: defineRoute([
		routeSegments.auth,
		routeSegments.forgotPassword,
	]),
	recoveryPassword: defineRoute([
		routeSegments.auth,
		routeSegments.recoveryPassword,
	]),
	confirmEmail: defineRoute([routeSegments.auth, routeSegments.confirm]),

	// Остальные маршруты

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
	settings: defineRoute([routeSegments.settings]),
}
