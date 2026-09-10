'use client'

import type { TDifficulty } from '@entities/difficulty'
import { difficultyStorage } from '@entities/difficulty'
import { Switch } from '@shared/ui/switch'
import { ToggleGroup } from '@shared/ui/toggle-group'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import type { TDifficultySettingsProps } from './types'

const toggleItems = [
	{
		value: 'easy',
		content: 'Простой',
	},
	{
		value: 'medium',
		content: 'Средний',
	},
	{
		value: 'hard',
		content: 'Сложный',
	},
]

export const DifficultySettings: React.FC<TDifficultySettingsProps> = ({
	titleAs: Title = 'h3',
}) => {
	const [difficulty, setDifficulty] = useState<TDifficulty>('easy')

	const lastSelectedRef = useRef<Exclude<TDifficulty, 'auto'>>('easy')

	useEffect(() => {
		const stored = difficultyStorage.get()

		if (stored) setDifficulty(stored)
	}, [])

	useEffect(() => {
		if (difficulty !== 'auto') {
			lastSelectedRef.current = difficulty
		}
	}, [difficulty])

	const changeDifficulty = (value: TDifficulty) => {
		setDifficulty(value)
		difficultyStorage.set(value)
	}

	const handleCheckedChange = (checked: boolean) => {
		changeDifficulty(checked ? 'auto' : lastSelectedRef.current)
	}

	return (
		<section className={styles.settingsCard}>
			<Title>Настройка сложности</Title>
			<ToggleGroup
				label="Выбор уровня сложности"
				items={toggleItems}
				type="single"
				value={difficulty}
				onValueChange={(value: Exclude<TDifficulty, 'auto'>) => {
					if (!value) return

					changeDifficulty(value)
				}}
			/>
			<div className={styles.switchWrapper}>
				<label htmlFor="auto-mode">Включить автоадаптацию сложности</label>
				<Switch
					id="auto-mode"
					checked={difficulty === 'auto'}
					onCheckedChange={handleCheckedChange}
				/>
			</div>
		</section>
	)
}
