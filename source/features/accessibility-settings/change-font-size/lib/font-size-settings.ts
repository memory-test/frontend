import type { TFontSize } from '../model/font-size'
import { applyFontSize } from './apply-font-size'
import { fontSizeStorage } from './font-size-storage'

export const getSavedFontSize = (): TFontSize => fontSizeStorage.get()

export const saveFontSize = (value: TFontSize) => {
	fontSizeStorage.set(value)
	applyFontSize(value)
}
