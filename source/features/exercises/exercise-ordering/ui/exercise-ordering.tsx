'use client'

import type { DragEndEvent } from '@dnd-kit/core'
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type {
	TExerciseState,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { createUrl, routerPath } from '@shared/lib/routes'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import type { TTimerResult } from '@shared/ui/timer'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { SortableItem } from './sortable-item'
import styles from './styles.module.css'
import type { TExerciseOrderingProps } from './types'

const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

const shuffleUntilDifferent = <T extends { id: number }>(array: T[]): T[] => {
	const originalOrder = array.map((item) => item.id).join(',')
	let shuffled = shuffleArray(array)
	let attempts = 0

	while (
		shuffled.map((item) => item.id).join(',') === originalOrder &&
		attempts < 10
	) {
		shuffled = shuffleArray(array)
		attempts++
	}

	return shuffled
}

export const ExerciseOrdering: React.FC<TExerciseOrderingProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
	onPass,
}) => {
	const router = useRouter()

	const [items, setItems] = useState(() => shuffleUntilDifferent(answersInfo))
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')
	const [isOrderChanged, setIsOrderChanged] = useState(false)

	const [timing, setTiming] = useState<TTimerResult | null>(null)
	const [resultData, setResultData] = useState<TResultExercise | null>(null)
	const [error, setError] = useState<string | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		setItems((items) => {
			const oldIndex = items.findIndex((item) => item.id === active.id)
			const newIndex = items.findIndex((item) => item.id === over.id)

			if (oldIndex !== newIndex) {
				setIsOrderChanged(true)
			}

			return arrayMove(items, oldIndex, newIndex)
		})
	}

	const handleOnNext = async (timing: TTimerResult) => {
		setTiming(timing)
		setError(null)

		try {
			const payload: TPassExercisePayload<'ordering'> = {
				started_at: timing.startedAt,
				finished_at: timing.finishedAt,
				duration_seconds: timing.durationSeconds,
				// order: items.map(item => item.id)  // TODO когда бэкенд уточнит
			}

			const response = await onPass(payload)
			setResultData(response)
			setExerciseState('result')
		} catch (err) {
			console.error('Ошибка при проверке задания:', err)
			setError(
				err instanceof Error
					? err.message
					: 'Что-то пошло не так. Попробуйте обновить страницу',
			)
		}
	}

	const handleReset = () => {
		setItems(shuffleUntilDifferent(answersInfo))
		setExerciseState('process')
		setIsOrderChanged(false)
		setResultData(null)
		setTiming(null)
		setError(null)
	}

	return (
		<>
			{exerciseState === 'process' && (
				<section>
					<ExerciseBase
						id={id}
						title={title}
						description={description}
						question={question}
						onNext={handleOnNext}
						isDisabled={!isOrderChanged}
					>
						{error && (
							<p role="alert" className={styles.error}>
								⚠️ {error}
							</p>
						)}

						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToParentElement]}
						>
							<SortableContext
								items={items.map((item) => item.id)}
								strategy={verticalListSortingStrategy}
							>
								<div className={styles.list}>
									{items.map((item) => (
										<SortableItem key={item.id} id={item.id} text={item.text} />
									))}
								</div>
							</SortableContext>
						</DndContext>
					</ExerciseBase>
				</section>
			)}

			{exerciseState === 'result' && timing && resultData && (
				<ExerciseResult
					exerciseName={title}
					date={timing.finishedAt}
					timeSpent={formatTime(timing.durationSeconds)}
					resultPercent={resultData.score}
					userAmountRightAnswer="17"
					allAmountRightAnswer="20"
					onReset={handleReset}
					onComplete={() => {
						router.replace(createUrl(routerPath.catalog))
					}}
				/>
			)}
		</>
	)
}
