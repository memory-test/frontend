export const FONT_SIZES = ['sm', 'md', 'lg', 'xlg'] as const

export type TFontSize = (typeof FONT_SIZES)[number]

export const DEFAULT_FONT_SIZE: TFontSize = 'sm'
