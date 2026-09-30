'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type React from 'react'
import styles from './styles.module.css'

type TSortableItemProps = {
	id: number
	text: string
}

export const SortableItem: React.FC<TSortableItemProps> = ({ id, text }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={styles.item}
		>
			{text}
		</div>
	)
}
