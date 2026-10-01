'use client'

import { useDraggable } from '@dnd-kit/core'
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
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({ id: `item-${id}` })

	const style = {
		transform: CSS.Transform.toString(transform),
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
			{text}
		</button>
	)
}
