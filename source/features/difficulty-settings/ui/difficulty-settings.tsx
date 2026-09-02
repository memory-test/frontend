'use client'

import { Switch } from '@shared/ui/switch'
import { ToggleGroup } from '@shared/ui/toggle-group'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TDifficultySettingsState } from './types'

const toggleItems = [
	{
		value: 'easy',
		content: 'Простой',
	},
	{
		value: 'normal',
		content: 'Средний',
	},
	{
		value: 'hard',
		content: 'Сложный',
	},
]

export const DifficultySettings = () => {
	const [difficultyState, setDifficultyState] =
		useState<TDifficultySettingsState>('hard')

	return (
		<article className={styles.settingsCard}>
			<h3>Настройка сложности</h3>
			<ToggleGroup
				label="Выбор уровня сложности"
				items={toggleItems}
				type="single"
				value={difficultyState}
				onValueChange={(value: TDifficultySettingsState) => {
					if (value) setDifficultyState(value)
				}}
			/>
			<div className={styles.switchWrapper}>
				<label htmlFor="auto-mode">Включить автоадаптацию сложности</label>
				<Switch
					id="auto-mode"
					checked={difficultyState === 'auto'}
					onCheckedChange={(checked) => {
						if (checked) {
							setDifficultyState('auto')
						} else {
							setDifficultyState('hard')
						}
					}}
				/>
			</div>
		</article>
	)
}
