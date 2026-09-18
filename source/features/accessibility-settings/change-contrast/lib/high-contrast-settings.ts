import { applyHighContrast } from './apply-high-contrast'
import { highContrastStorage } from './high-contrast-storage'

export const getSavedHighContrast = (): boolean => highContrastStorage.get()

export const saveHighContrast = (value: boolean) => {
	highContrastStorage.set(value)
	applyHighContrast(value)
}
