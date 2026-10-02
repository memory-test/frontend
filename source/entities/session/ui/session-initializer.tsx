'use client'

import { onSessionExpired } from '@shared/api'
import { useEffect } from 'react'
import { restoreSession } from '../model/restore-session'
import { useSessionStore } from '../model/store'

export const SessionInitializer = () => {
	useEffect(() => {
		const unsubscribe = onSessionExpired(() => {
			useSessionStore.getState().clearSession()
		})

		restoreSession()

		return unsubscribe
	}, [])

	return null
}
