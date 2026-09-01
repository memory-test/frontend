'use client'

import clsx from 'clsx'
import type * as React from 'react'
import styles from './styles.module.css'
import type { TTagProps } from './types'

export const Tag: React.FC<TTagProps> = ({
	children,
	color = 'primary',
	className,
}) => {
	return (
		<span className={clsx(styles.tag, styles[`color_${color}`], className)}>
			{children}
		</span>
	)
}

Tag.displayName = 'Tag'
