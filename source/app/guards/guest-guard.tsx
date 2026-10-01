'use client'

import { tokenStorage } from '@shared/api'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

export const GuestGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const router = useRouter()

	const [isAllowed, setIsAllowed] = useState(false)

	useEffect(() => {
		if (tokenStorage.getTokens()) {
			router.replace(createUrl(routerPath.profile))
			return
		}

		setIsAllowed(true)
	}, [router])

	if (!isAllowed) return null

	return children
}
