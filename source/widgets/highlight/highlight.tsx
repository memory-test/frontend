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
	as,
	className,
}) => {
	const HeadingTag = as || 'h2'

	return (
		<div className={clsx(styles.highlight, className)}>
			<div className={styles.content}>
				<HeadingTag className={styles.title}>{title}</HeadingTag>

				<p className={styles.subtitle}>{subtitle}</p>

				<Tag color={tagColor}>{tagText}</Tag>

				<div className={styles.actionSection}>{actionSlot}</div>
			</div>
		</div>
	)
}

Highlight.displayName = 'Highlight'
