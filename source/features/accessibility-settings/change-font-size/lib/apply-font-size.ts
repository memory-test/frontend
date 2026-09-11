import type { TFontSize } from '../model/font-size'

export const applyFontSize = (value: TFontSize) => {
	document.documentElement.dataset.fontSize = value
}
