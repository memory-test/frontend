import { DEFAULT_HIGH_CONTRAST } from '../model/high-contrast'

const STORAGE_KEY = 'high-contrast'

export const highContrastStorage = {
	get: (): boolean => {
		if (typeof window === 'undefined') return DEFAULT_HIGH_CONTRAST

		const raw = localStorage.getItem(STORAGE_KEY)

		if (raw === 'true') return true
		if (raw === 'false') return false

		return DEFAULT_HIGH_CONTRAST
	},

	set: (value: boolean) => {
		localStorage.setItem(STORAGE_KEY, String(value))
	},
}
