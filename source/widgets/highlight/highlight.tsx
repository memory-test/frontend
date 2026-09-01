'use client'

import { Tag } from '@shared/ui/tag'
import clsx from 'clsx'
import type * as React from 'react'
import styles from './styles.module.css'
import type { THighlightProps } from './types'

export const Highlight: React.FC<THighlightProps> = ({
	title,
	subtitle,
	tagText,
	tagColor = 'primary',
	actionSlot,
	className,
}) => {
	return (
		<div className={clsx(styles.highlight, className)}>
			<div className={styles.content}>
				<h1 className={styles.title}>{title}</h1>

				<p className={styles.subtitle}>{subtitle}</p>

				<Tag color={tagColor}>{tagText}</Tag>

				<div className={styles.actionSection}>{actionSlot}</div>
			</div>
		</div>
	)
}

Highlight.displayName = 'Highlight'
