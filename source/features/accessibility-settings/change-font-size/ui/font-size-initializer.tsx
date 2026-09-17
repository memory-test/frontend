'use client'

import { useEffect } from 'react'
import { applyFontSize } from '../lib/apply-font-size'
import { fontSizeStorage } from '../lib/font-size-storage'

export const FontSizeInitializer = () => {
	useEffect(() => {
		applyFontSize(fontSizeStorage.get())
	}, [])

	return null
}
