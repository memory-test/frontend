'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { TRouteQueryParamsUpdate } from '../types'
import {
	mergeRouteQueryParams,
	parseRouteQueryParams,
} from '../utils/route-query-params'

export const useRouteQueryParams = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const queryParams = parseRouteQueryParams(searchParams)

	const setQueryParams = (updates: TRouteQueryParamsUpdate) => {
		const next = mergeRouteQueryParams(searchParams, updates)
		const queryString = next.toString()

		router.replace(queryString ? `${pathname}?${queryString}` : pathname)
	}

	return { queryParams, setQueryParams }
}
