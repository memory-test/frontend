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
import type { TExerciseState } from '@entities/exercise'
import { ExerciseBase } from '@shared/ui/exercise-base'
import type React from 'react'
import { useRef, useState } from 'react'
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
}) => {
	const [items, setItems] = useState(() => shuffleUntilDifferent(answersInfo))
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')
	const [isOrderChanged, setIsOrderChanged] = useState(false) // ← новое
	const elapsedTime = useRef(0)

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

	const handleOnNext = () => {
		setExerciseState('result')
	}

	return (
		<section>
			{exerciseState === 'process' && (
				<ExerciseBase
					id={id}
					title={title}
					description={description}
					question={question}
					onTimeStop={(time) => (elapsedTime.current = time)}
					onNext={handleOnNext}
					isDisabled={!isOrderChanged} // ← блокируем до первого перемещения
				>
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
			)}

			{exerciseState === 'result' && <h1>результат</h1>}
		</section>
	)
}
