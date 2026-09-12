const STORAGE_KEY = 'high-contrast'

export const highContrastStorage = {
	get: (): boolean => {
		if (typeof window === 'undefined') return false

		return localStorage.getItem(STORAGE_KEY) === 'true'
	},

	set: (value: boolean) => {
		localStorage.setItem(STORAGE_KEY, String(value))
	},
}
