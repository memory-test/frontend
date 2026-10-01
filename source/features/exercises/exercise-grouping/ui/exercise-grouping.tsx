'use client'

import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import type {
	TExerciseState,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { createUrl, routerPath } from '@shared/lib/routes'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import { Surface } from '@shared/ui/surface'
import type { TTimerResult } from '@shared/ui/timer'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { GroupingDropZone } from './grouping-drop-zone'
import { GroupingItem } from './grouping-item'
import styles from './styles.module.css'
import type {
	TExerciseGroupingProps,
	TGroupingAnswerInfo,
	TGroupingItemState,
} from './types'

export const ExerciseGrouping: React.FC<TExerciseGroupingProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
	onPass,
}) => {
	const router = useRouter()

	const data = answersInfo as unknown as TGroupingAnswerInfo
	const groups = data.groups // ← строки

	const [items, setItems] = useState<TGroupingItemState[]>(
		data.items.map((item) => ({ ...item, group: null })),
	)

	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

	const [timing, setTiming] = useState<TTimerResult | null>(null)
	const [resultData, setResultData] = useState<TResultExercise | null>(null)
	const [error, setError] = useState<string | null>(null)

	const { setNodeRef: setUnassignedRef, isOver: isOverUnassigned } =
		useDroppable({ id: 'unassigned' })

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor),
	)

	const unassignedItems = items.filter((item) => item.group === null)
	const getItemsByGroup = (group: string) =>
		items.filter((item) => item.group === group)

	const moveItem = (itemId: number, group: string | null) => {
		setItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, group } : item)),
		)
		setSelectedItemId(null)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over) return

		const itemId = Number(String(active.id).replace('item-', ''))
		const overId = String(over.id)

		if (overId === 'unassigned') {
			moveItem(itemId, null)
			return
		}

		if (overId.startsWith('group-')) {
			const group = overId.replace('group-', '') // ← имя группы
			moveItem(itemId, group)
		}
	}

	const handleItemClick = (itemId: number) => {
		setSelectedItemId((prev) => (prev === itemId ? null : itemId))
	}

	const handleZoneClick = (group: string) => {
		if (selectedItemId !== null) {
			moveItem(selectedItemId, group)
		}
	}

	const handleOnNext = async (timingResult: TTimerResult) => {
		setTiming(timingResult)
		setError(null)

		const payload: TPassExercisePayload<'grouping'> = {
			started_at: timingResult.startedAt,
			finished_at: timingResult.finishedAt,
			duration_seconds: timingResult.durationSeconds,
			assignments: items.flatMap((item) =>
				item.group !== null ? [{ item_id: item.id, group: item.group }] : [],
			),
		}

		try {
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
		setItems(data.items.map((item) => ({ ...item, group: null })))
		setSelectedItemId(null)
		setExerciseState('process')
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
						isDisabled={unassignedItems.length > 0}
					>
						<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
							<Surface className={styles.container}>
								{error && (
									<p role="alert" className={styles.error}>
										⚠️ {error}
									</p>
								)}

								<div
									ref={setUnassignedRef}
									className={clsx(styles.itemsRow, {
										[styles.dropZoneOver]: isOverUnassigned,
									})}
								>
									{unassignedItems.map((item) => (
										<GroupingItem
											key={item.id}
											id={item.id}
											text={item.text}
											isSelected={selectedItemId === item.id}
											onClick={() => handleItemClick(item.id)}
										/>
									))}
								</div>

								<div className={styles.groupsRow}>
									{groups.map((group) => (
										<GroupingDropZone
											key={group}
											group={group}
											items={getItemsByGroup(group)}
											selectedItemId={selectedItemId}
											onItemClick={handleItemClick}
											onZoneClick={handleZoneClick}
										/>
									))}
								</div>
							</Surface>
						</DndContext>
					</ExerciseBase>
				</section>
			)}

			{exerciseState === 'result' && timing && resultData && (
				<ExerciseResult
					exerciseName={title}
					date={timing.finishedAt}
					timeSpent={formatTime(timing.durationSeconds)}
					resultPercent={resultData.score * 100}
					userAmountRightAnswer={Math.round(
						resultData.score * items.length,
					).toString()}
					allAmountRightAnswer={items.length.toString()}
					onReset={handleReset}
					onComplete={() => {
						router.replace(createUrl(routerPath.catalog))
					}}
				/>
			)}
		</>
	)
}
