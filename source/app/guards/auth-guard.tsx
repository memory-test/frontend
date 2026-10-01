'use client'

import { onSessionExpired, tokenStorage } from '@shared/api'
import { createUrl, routerPath } from '@shared/lib/routes'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const router = useRouter()
	const pathname = usePathname()

	const [isAllowed, setIsAllowed] = useState(false)

	const authUrl = createUrl(routerPath.auth, undefined, { from: pathname })

	useEffect(() => {
		if (tokenStorage.getTokens()) {
			setIsAllowed(true)
			return
		}

		router.replace(authUrl)
	}, [router, authUrl])

	useEffect(
		() =>
			onSessionExpired(() => {
				setIsAllowed(false)
				router.replace(authUrl)
			}),
		[router, authUrl],
	)

	if (!isAllowed) return <p>Проверяем доступ...</p>

	return children
}
