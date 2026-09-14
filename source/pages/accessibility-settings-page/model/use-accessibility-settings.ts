import {
	DEFAULT_HIGH_CONTRAST,
	getSavedHighContrast,
	saveHighContrast,
} from '@features/accessibility-settings/change-contrast'
import {
	DEFAULT_FONT_SIZE,
	getSavedFontSize,
	saveFontSize,
} from '@features/accessibility-settings/change-font-size'
import { useEffect, useState } from 'react'
import type { TAccessibilitySettingsPageState } from './types'

const initialState: TAccessibilitySettingsPageState = {
	fontSize: DEFAULT_FONT_SIZE,
	highContrast: DEFAULT_HIGH_CONTRAST,
}

const readSavedState = (): TAccessibilitySettingsPageState => ({
	fontSize: getSavedFontSize(),
	highContrast: getSavedHighContrast(),
})

export const useAccessibilitySettings = () => {
	const [savedState, setSavedState] =
		useState<TAccessibilitySettingsPageState>(initialState)
	const [currentState, setCurrentState] =
		useState<TAccessibilitySettingsPageState>(initialState)

	useEffect(() => {
		const storedState = readSavedState()

		setCurrentState(storedState)
		setSavedState(storedState)
	}, [])

	const updateSettings = <K extends keyof TAccessibilitySettingsPageState>(
		key: K,
		value: TAccessibilitySettingsPageState[K],
	) => {
		setCurrentState((prev) => ({ ...prev, [key]: value }))
	}

	const isDirty =
		currentState.fontSize !== savedState.fontSize ||
		currentState.highContrast !== savedState.highContrast

	const save = () => {
		saveFontSize(currentState.fontSize)
		saveHighContrast(currentState.highContrast)
		setSavedState(currentState)
	}

	const reset = () => setCurrentState(savedState)

	return { currentState, isDirty, updateSettings, save, reset }
}
