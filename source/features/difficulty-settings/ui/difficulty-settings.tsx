'use client'

import { useSessionStore, useUpdateDifficulty } from '@entities/session'
import type { TDifficulty } from '@shared/types'
import { ToggleGroup } from '@shared/ui/toggle-group'
import type React from 'react'
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
	const difficulty = useSessionStore((state) => state.user?.currentDifficulty)
	const isInitializing = useSessionStore((state) => state.isInitializing)

	const { mutate: changeDifficulty, isError } = useUpdateDifficulty()

	const renderControl = () => {
		if (difficulty) {
			return (
				<ToggleGroup
					label="Выбор уровня сложности"
					labelClassName={styles.label}
					items={toggleItems}
					type="single"
					value={difficulty}
					onValueChange={(value: TDifficulty) => {
						if (!value) return

						changeDifficulty(value)
					}}
				/>
			)
		}

		if (isInitializing) {
			return <p>Загрузка сложности...</p>
		}

		return <p role="alert">Не удалось загрузить сложность. Обновите страницу</p>
	}

	return (
		<section className={styles.settingsCard}>
			<Title className={styles.title}>Настройка сложности</Title>

			{renderControl()}

			{isError && <p role="alert">Не удалось сохранить настройку</p>}
		</section>
	)
}
