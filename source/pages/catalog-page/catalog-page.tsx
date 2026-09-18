'use client'

import type { TDifficulty } from '@entities/difficulty'
import { difficultyStorage } from '@entities/difficulty'
import type { TExerciseType } from '@entities/exercise'
import { exerciseApi } from '@entities/exercise'
import { ExerciseCard } from '@shared/ui/exercise-card'
import { Select } from '@shared/ui/select'
import { Surface } from '@shared/ui/surface'
import { Tag } from '@shared/ui/tag'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

const DIFFICULTY_OPTIONS = [
	{ value: 'easy', label: 'Простая' },
	{ value: 'medium', label: 'Средняя' },
	{ value: 'hard', label: 'Продвинутая' },
]

const TYPE_OPTIONS = [
	{ value: 'choice', label: 'Выбор ответа' },
	{ value: 'input', label: 'Ручной ввод' },
	{ value: 'ordering', label: 'Сортировка' },
	{ value: 'grouping', label: 'Группировка' },
	{ value: 'matching', label: 'Сопоставление' },
	{ value: 'drawing', label: 'Графическое' },
	{ value: 'offline', label: 'Офлайн' },
]

const DIFFICULTY_MAP = {
	easy: { color: 'primary', label: 'Лёгкий' },
	medium: { color: 'warning', label: 'Средний' },
	hard: { color: 'error', label: 'Сложный' },
} as const

export const CatalogPage: React.FC = () => {
	const [difficulty, setDifficulty] = useState<TDifficulty | undefined>(
		undefined,
	)
	const [type, setType] = useState<TExerciseType | undefined>(undefined)
	const [page, setPage] = useState(1)
	const [isHydrated, setIsHydrated] = useState(false)

	useEffect(() => {
		const saved = difficultyStorage.get()
		if (saved) setDifficulty(saved)
		setIsHydrated(true)
	}, [])

	const handleDifficultyChange = (value: TDifficulty) => {
		setDifficulty(value)
		difficultyStorage.set(value)
		setPage(1)
	}

	const handleTypeChange = (value: TExerciseType) => {
		setType(value)
		setPage(1)
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['exercises', difficulty, type, page],
		queryFn: () =>
			exerciseApi.getList({
				difficulty:
					difficulty === 'auto' ? undefined : (difficulty ?? undefined),
				type: type,
				page: page,
				limit: 20,
			}),
		enabled: isHydrated,
	})

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.toolbar}>
					<h1 className={styles.title}>Каталог</h1>

					{isHydrated && (
						<div className={styles.filters}>
							<Select
								className={styles.select}
								placeholder="Сложность"
								options={DIFFICULTY_OPTIONS}
								value={difficulty}
								onValueChange={handleDifficultyChange}
								aria-label="Фильтр по сложности"
							/>
							<Select
								className={styles.select}
								placeholder="Тип задания"
								options={TYPE_OPTIONS}
								value={type}
								onValueChange={handleTypeChange}
								aria-label="Фильтр по типу задания"
							/>
						</div>
					)}
				</div>

				<section className={styles.cards}>
					{isLoading && <p>Загрузка...</p>}
					{error && <p>Ошибка загрузки</p>}
					{data && data.results.length === 0 && <p>Заданий пока нет</p>}
					{data && data.results.length > 0 && (
						<>
							<ul className={styles.list}>
								{data.results.map((exercise) => {
									const difficultyInfo = DIFFICULTY_MAP[exercise.difficulty]
									return (
										<li key={exercise.id}>
											<Surface className={styles.cardSurface}>
												<ExerciseCard
													title={exercise.title}
													image="/images/promo.jpg"
													slot={
														<Tag color={difficultyInfo.color}>
															{difficultyInfo.label}
														</Tag>
													}
													onStart={String(exercise.id)}
													onDescription={() => {
														console.log('Подробнее:', exercise.id)
													}}
												/>
											</Surface>
										</li>
									)
								})}
							</ul>

							<div className={styles.pagination}>
								<button
									type="button"
									onClick={() => setPage((p) => p - 1)}
									disabled={!data.previous}
									className={styles.paginationButton}
								>
									← Назад
								</button>
								<span className={styles.paginationInfo}>
									Страница {page} из {Math.ceil(data.count / 5)}
								</span>
								<button
									type="button"
									onClick={() => setPage((p) => p + 1)}
									disabled={!data.next}
									className={styles.paginationButton}
								>
									Вперёд →
								</button>
							</div>
						</>
					)}
				</section>
			</div>
		</main>
	)
}
