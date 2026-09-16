import { Button } from '@shared/ui/button'
import { Surface } from '@shared/ui/surface'
import clsx from 'clsx'
import type React from 'react'
import styles from './styles.module.css'
import type { TErrorStateProps } from './types'

export const ErrorState: React.FC<TErrorStateProps> = ({
	title,
	description,
	onRetry,
	actionLabel = 'Попробовать снова',
	className,
}) => {
	return (
		<Surface className={clsx(styles.errorState, className)}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.description}>{description}</p>
			{onRetry && (
				<Button onClick={onRetry} variant="default">
					{actionLabel}
				</Button>
			)}
		</Surface>
	)
}
