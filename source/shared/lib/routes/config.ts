import { defineRoute } from './utils/define-route'

// Route segments (ТОЛЬКО атомарные части URL)
export const routeSegments = {
	auth: 'auth',
	forgotPassword: 'forgot-password',
	recoveryPassword: 'recovery-password',
	profile: 'profile',
	catalog: 'catalog',
	register: 'register',
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
	register: defineRoute([routeSegments.auth, routeSegments.register]),
	forgotPassword: defineRoute([
		routeSegments.auth,
		routeSegments.forgotPassword,
	]),
	recoveryPassword: defineRoute([
		routeSegments.auth,
		routeSegments.recoveryPassword,
	]),

	// Остальные маршруты
	profile: defineRoute([routeSegments.profile]),
	catalog: defineRoute([routeSegments.catalog]),
}
