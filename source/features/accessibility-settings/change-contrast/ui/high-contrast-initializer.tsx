'use client'

import { useEffect } from 'react'
import { applyHighContrast } from '../lib/apply-high-contrast'
import { highContrastStorage } from '../lib/high-contrast-storage'

export const HighContrastInitializer = () => {
	useEffect(() => {
		applyHighContrast(highContrastStorage.get())
	}, [])

	return null
}
