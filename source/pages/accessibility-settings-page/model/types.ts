import type { TFontSize } from '@features/accessibility-settings/change-font-size'

export type TAccessibilitySettingsPageState = {
	fontSize: TFontSize
	highContrast: boolean
}
