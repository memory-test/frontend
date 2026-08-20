import type { routeQueryParams, routerPath, routeSegments } from './config'

export type TRouteSegment = (typeof routeSegments)[keyof typeof routeSegments]

export type TRouterPath = typeof routerPath
export type TRouterPathValue = TRouterPath[keyof TRouterPath]

export type TRouteQueryParamName = keyof typeof routeQueryParams
export type TRouteQueryParamsState = Record<TRouteQueryParamName, string | null>
export type TRouteQueryParamsUpdate = Partial<
	Record<TRouteQueryParamName, string | null | undefined>
>

type TExtractRouteParams<T extends string> =
	T extends `${string}:${infer Param}/${infer Rest}`
		? Param | TExtractRouteParams<Rest>
		: T extends `${string}:${infer Param}`
			? Param
			: never

type TQueryParamsArg = Partial<Record<TRouteQueryParamName, string>>

export type TCreateUrlArgs<T extends TRouterPathValue> = [
	TExtractRouteParams<T>,
] extends [never]
	? [path: T, params?: undefined, queryParams?: TQueryParamsArg]
	: [
			path: T,
			params: Record<TExtractRouteParams<T>, string>,
			queryParams?: TQueryParamsArg,
		]
