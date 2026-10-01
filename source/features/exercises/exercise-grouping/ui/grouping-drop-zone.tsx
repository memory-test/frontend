'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import clsx from 'clsx'
import type React from 'react'
import { GroupingItem } from './grouping-item'
import styles from './styles.module.css'
import type { TGroupingItemState } from './types'

type TGroupingDropZoneProps = {
	group: string
	items: TGroupingItemState[]
	selectedItemId: number | null
	isDragging: boolean
	isOver: boolean
	onItemClick: (itemId: number) => void
	onZoneClick: (group: string) => void
}

export const GroupingDropZone: React.FC<TGroupingDropZoneProps> = ({
	group,
	items,
	selectedItemId,
	isDragging,
	isOver,
	onItemClick,
	onZoneClick,
}) => {
	const { setNodeRef } = useDroppable({ id: `group-${group}` })
	const itemIds = items.map((item) => `item-${item.id}`)

	const showPlaceholder = (isDragging || items.length === 0) && !isOver

	return (
		<div className={styles.dropZone}>
			<button
				type="button"
				className={styles.dropZoneHeader}
				onClick={() => onZoneClick(group)}
			>
				{group}
			</button>

			<div
				ref={setNodeRef}
				className={clsx(styles.dropZoneBody, {
					[styles.dropZoneOver]: isOver,
				})}
			>
				<SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
					{items.map((item) => (
						<GroupingItem
							key={item.id}
							id={item.id}
							text={item.text}
							isSelected={selectedItemId === item.id}
							onClick={() => onItemClick(item.id)}
						/>
					))}
					{showPlaceholder && (
						<div className={styles.dropZoneEmpty} aria-hidden="true" />
					)}
				</SortableContext>
			</div>
		</div>
	)
}
