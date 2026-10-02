'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import type React from 'react'
import styles from './styles.module.css'

type TGroupingItemProps = {
	id: number
	text: string
	isSelected: boolean
	onClick: () => void
}

export const GroupingItem: React.FC<TGroupingItemProps> = ({
	id,
	text,
	isSelected,
	onClick,
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: `item-${id}` })

	const style = {
		// ← сбрасываем transform, когда карточку тащат
		transform: isDragging ? undefined : CSS.Transform.toString(transform),
		transition: isDragging ? undefined : transition,
	}

	return (
		<button
			ref={setNodeRef}
			type="button"
			style={style}
			{...attributes}
			{...listeners}
			onClick={onClick}
			className={clsx(styles.item, {
				[styles.itemSelected]: isSelected,
				[styles.itemDragging]: isDragging,
			})}
		>
			<span className={styles.itemText}>{text}</span>
		</button>
	)
}
