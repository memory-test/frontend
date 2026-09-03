'use client'

import { Switch } from '@shared/ui/switch'
import { ToggleGroup } from '@shared/ui/toggle-group'
import { useRef, useState } from 'react'
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
	// TODO: взять начальное состояние из бека
	// 32 строка ошибка с типами, поскольку ТС сужает типо до литерала
	// в будущем когда инфа будет с бека эта ошибка должна уйти
	const initialState: TDifficultySettingsState = 'easy'

	const [difficultyState, setDifficultyState] =
		useState<TDifficultySettingsState>(initialState)

	const lastSelectedRef = useRef<Exclude<TDifficultySettingsState, 'auto'>>(
		initialState === 'auto' ? 'easy' : initialState,
	)

	return (
		<section className={styles.settingsCard}>
			<h3>Настройка сложности</h3>
			<ToggleGroup
				label="Выбор уровня сложности"
				items={toggleItems}
				type="single"
				value={difficultyState}
				onValueChange={(value: Exclude<TDifficultySettingsState, 'auto'>) => {
					if (!value) return

					lastSelectedRef.current = value
					setDifficultyState(value)
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
							setDifficultyState(lastSelectedRef.current)
						}
					}}
				/>
			</div>
		</section>
	)
}
