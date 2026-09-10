'use client'

import { mockExercises } from '@entities/exercise'
import { Tag } from '@shared/ui/tag'
import { Footer } from '@widgets/footer'
import styles from './styles.module.css'

const DIFFICULTY_MAP: Record<
	string,
	{ color: 'primary' | 'warning' | 'error'; label: string }
> = {
	easy: { color: 'primary', label: 'Лёгкий' },
	medium: { color: 'warning', label: 'Средний' },
	hard: { color: 'error', label: 'Сложный' },
}

export const CatalogPage: React.FC = () => {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.container}>
					<h1 className={styles.title}>Каталог заданий</h1>

					<ul className={styles.list}>
						{mockExercises.map((exercise) => {
							const difficultyInfo = DIFFICULTY_MAP[exercise.difficulty]
							return (
								<li key={exercise.id} className={styles.item}>
									<span className={styles.name}>{exercise.title}</span>
									<Tag color={difficultyInfo.color}>{difficultyInfo.label}</Tag>
								</li>
							)
						})}
					</ul>
				</div>
			</main>
			<Footer />
		</div>
	)
}
