'use client'

import { useSessionStore } from '@entities/session'
import { createUrl, routerPath } from '@shared/lib/routes'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect } from 'react'

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const router = useRouter()
	const pathname = usePathname()

	const user = useSessionStore((state) => state.user)
	const isInitializing = useSessionStore((state) => state.isInitializing)

	const authUrl = createUrl(routerPath.auth, undefined, { from: pathname })

	useEffect(() => {
		if (isInitializing || user) return

		router.replace(authUrl)
	}, [isInitializing, user, router, authUrl])

	if (isInitializing || !user) return <p>Проверяем доступ...</p>

	return children
}
