'use client'

import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import type React from 'react'
import { GroupingItem } from './grouping-item'
import styles from './styles.module.css'
import type { TGroupingItemState } from './types'

type TGroupingDropZoneProps = {
	group: string
	items: TGroupingItemState[]
	selectedItemId: number | null
	onItemClick: (itemId: number) => void
	onZoneClick: (group: string) => void
}

export const GroupingDropZone: React.FC<TGroupingDropZoneProps> = ({
	group,
	items,
	selectedItemId,
	onItemClick,
	onZoneClick,
}) => {
	const { setNodeRef, isOver } = useDroppable({ id: `group-${group}` })

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
				{items.map((item) => (
					<GroupingItem
						key={item.id}
						id={item.id}
						text={item.text}
						isSelected={selectedItemId === item.id}
						onClick={() => onItemClick(item.id)}
					/>
				))}
			</div>
		</div>
	)
}
