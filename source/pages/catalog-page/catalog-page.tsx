'use client'

import { Select } from '@shared/ui/select'
import { useState } from 'react'
import styles from './styles.module.css'

const DIFFICULTY_OPTIONS = [
	{ value: 'easy', label: 'Простая' },
	{ value: 'medium', label: 'Средняя' },
	{ value: 'hard', label: 'Продвинутая' },
]

export const CatalogPage: React.FC = () => {
	const [difficulty, setDifficulty] = useState<string | undefined>(undefined)

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.toolbar}>
					<h1 className={styles.title}>Каталог</h1>
					<Select
						className={styles.select}
						placeholder="Сложность"
						options={DIFFICULTY_OPTIONS}
						value={difficulty}
						onValueChange={setDifficulty}
						aria-label="Фильтр по сложности"
					/>
				</div>

				<section className={styles.cards}>
					<p>карточки</p>
				</section>
			</div>
		</main>
	)
}
