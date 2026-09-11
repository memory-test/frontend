import type { TFontSize } from '../model/font-size'
import { DEFAULT_FONT_SIZE, FONT_SIZES } from '../model/font-size'

const STORAGE_KEY = 'font-size'

const isFontSize = (value: unknown): value is TFontSize =>
	typeof value === 'string' && (FONT_SIZES as readonly string[]).includes(value)

export const fontSizeStorage = {
	get: (): TFontSize => {
		if (typeof window === 'undefined') return DEFAULT_FONT_SIZE

		const raw = localStorage.getItem(STORAGE_KEY)

		return isFontSize(raw) ? raw : DEFAULT_FONT_SIZE
	},

	set: (value: TFontSize) => {
		localStorage.setItem(STORAGE_KEY, value)
	},
}
