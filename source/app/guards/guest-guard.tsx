'use client'

import { useSessionStore } from '@entities/session'
import { createUrl, routeQueryParams, routerPath } from '@shared/lib/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'
import { useEffect } from 'react'

const isInternalPath = (value: string): boolean =>
	value.startsWith('/') && !value.startsWith('//')

export const GuestGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const user = useSessionStore((state) => state.user)
	const isInitializing = useSessionStore((state) => state.isInitializing)

	useEffect(() => {
		if (isInitializing || !user) return

		const from = searchParams.get(routeQueryParams.from) ?? ''

		router.replace(isInternalPath(from) ? from : createUrl(routerPath.home))
	}, [isInitializing, user, router, searchParams])

	return children
}
