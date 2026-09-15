'use client'

import { ChangeContrast } from '@features/accessibility-settings/change-contrast'
import { ChangeFontSize } from '@features/accessibility-settings/change-font-size'
import { Button } from '@shared/ui/button'
import { Surface } from '@shared/ui/surface'
import { useAccessibilitySettings } from '../model/use-accessibility-settings'
import styles from './styles.module.css'

export const AccessibilitySettingsPage = () => {
	const { currentState, isDirty, updateSettings, save, reset } =
		useAccessibilitySettings()

	return (
		<section>
			<div className={styles.settingsWrapper}>
				<Surface>
					<ChangeFontSize
						value={currentState.fontSize}
						onChange={(value) => updateSettings('fontSize', value)}
					/>
				</Surface>

				<Surface>
					<ChangeContrast
						value={currentState.highContrast}
						onChange={(value) => updateSettings('highContrast', value)}
					/>
				</Surface>
			</div>

			<div className={styles.btnWrapper}>
				<Button onClick={save} disabled={!isDirty}>
					Сохранить
				</Button>
				<Button variant="outline" onClick={reset} disabled={!isDirty}>
					Сбросить настройки
				</Button>
			</div>
		</section>
	)
}
