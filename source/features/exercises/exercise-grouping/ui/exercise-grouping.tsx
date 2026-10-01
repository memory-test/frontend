'use client'

import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
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
import { Surface } from '@shared/ui/surface'
import type { TTimerResult } from '@shared/ui/timer'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { GroupingDropZone } from './grouping-drop-zone'
import { GroupingItem } from './grouping-item'
import styles from './styles.module.css'
import type { TExerciseGroupingProps, TGroupingItemState } from './types'

export const ExerciseGrouping: React.FC<TExerciseGroupingProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
	onPass,
}) => {
	const router = useRouter()

	const groups = answersInfo.groups
	const [items, setItems] = useState<TGroupingItemState[]>(
		answersInfo.items.map((item) => ({ ...item, group: null })),
	)

	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
	const [activeItem, setActiveItem] = useState<TGroupingItemState | null>(null)
	const [overContainer, setOverContainer] = useState<string | null>(null)

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

	const findContainer = (rawId: string | number): string => {
		const itemId = String(rawId)

		if (itemId === 'unassigned') return 'unassigned'
		if (itemId.startsWith('group-')) return itemId.replace('group-', '')

		if (itemId.startsWith('item-')) {
			const numericId = Number(itemId.replace('item-', ''))
			const item = items.find((i) => i.id === numericId)
			return item?.group ?? 'unassigned'
		}

		return 'unassigned'
	}

	const handleDragStart = (event: DragStartEvent) => {
		const itemId = Number(String(event.active.id).replace('item-', ''))
		setActiveItem(items.find((i) => i.id === itemId) ?? null)
		setOverContainer(null)
	}

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event

		if (!over) {
			setOverContainer(null)
			return
		}

		const activeContainer = findContainer(active.id)
		const overContainerId = findContainer(over.id)

		setOverContainer(overContainerId)

		if (activeContainer === overContainerId) return

		const activeItemId = Number(String(active.id).replace('item-', ''))
		const newGroup = overContainerId === 'unassigned' ? null : overContainerId

		setItems((prev) =>
			prev.map((item) =>
				item.id === activeItemId ? { ...item, group: newGroup } : item,
			),
		)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		setActiveItem(null)
		setOverContainer(null)
		if (!over) return

		const activeContainer = findContainer(active.id)
		const overContainerId = findContainer(over.id)

		if (activeContainer !== overContainerId) return

		const activeId = Number(String(active.id).replace('item-', ''))
		const overId = Number(String(over.id).replace('item-', ''))

		if (activeId === overId) return

		setItems((prev) => {
			const group = activeContainer === 'unassigned' ? null : activeContainer
			const inContainer = prev.filter((i) => i.group === group)
			const others = prev.filter((i) => i.group !== group)

			const oldIndex = inContainer.findIndex((i) => i.id === activeId)
			const newIndex = inContainer.findIndex((i) => i.id === overId)

			if (oldIndex === -1 || newIndex === -1) return prev

			return [...others, ...arrayMove(inContainer, oldIndex, newIndex)]
		})
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
		setItems(answersInfo.items.map((item) => ({ ...item, group: null })))
		setSelectedItemId(null)
		setExerciseState('process')
		setResultData(null)
		setTiming(null)
		setError(null)
	}

	return (
		<>
			{exerciseState === 'process' && (
				<section className={styles.section} aria-label={title}>
					<ExerciseBase
						id={id}
						title={title}
						description={description}
						question={question}
						onNext={handleOnNext}
						isDisabled={unassignedItems.length > 0}
						className={styles.baseOverride}
					>
						<DndContext
							sensors={sensors}
							onDragStart={handleDragStart}
							onDragOver={handleDragOver}
							onDragEnd={handleDragEnd}
						>
							<Surface
								className={clsx(styles.container, styles.surfaceOverride)}
							>
								{error && (
									<p role="alert" className={styles.error}>
										⚠️ {error}
									</p>
								)}

								{/* Верхняя зона — нераспределённые карточки */}
								<div
									ref={setUnassignedRef}
									className={clsx(styles.itemsRow, {
										[styles.dropZoneOver]: isOverUnassigned,
									})}
								>
									<SortableContext
										items={unassignedItems.map((item) => `item-${item.id}`)}
										strategy={verticalListSortingStrategy}
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
									</SortableContext>
								</div>

								{/* Нижняя зона — группы */}
								<div className={styles.groupsRow}>
									{groups.map((group) => (
										<GroupingDropZone
											key={group}
											group={group}
											items={getItemsByGroup(group)}
											selectedItemId={selectedItemId}
											isDragging={activeItem !== null}
											isOver={overContainer === group}
											onItemClick={handleItemClick}
											onZoneClick={handleZoneClick}
										/>
									))}
								</div>
							</Surface>

							<DragOverlay adjustScale={false}>
								{activeItem && (
									<div className={clsx(styles.item, styles.itemOverlay)}>
										<span className={styles.itemText}>{activeItem.text}</span>
									</div>
								)}
							</DragOverlay>
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
