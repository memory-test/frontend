import clsx from 'clsx'
import styles from './styles.module.css'
import type { TSurfaceProps } from './types'

export const Surface: React.FC<TSurfaceProps> = ({
	children,
	className,
	...prop
}) => {
	return (
		<div className={clsx(styles.surface, className)} {...prop}>
			{children}
		</div>
	)
}
