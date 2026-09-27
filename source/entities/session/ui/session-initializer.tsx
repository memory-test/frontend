'use client'

import { useEffect } from 'react'
import { restoreSession } from '../model/restore-session'

export const SessionInitializer = () => {
	useEffect(() => {
		restoreSession()
	}, [])

	return null
}
