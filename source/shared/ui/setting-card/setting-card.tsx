import clsx from 'clsx'
import type React from 'react'
import styles from './styles.module.css'
import type { TSettingCardProps } from './types'

export const SettingCard: React.FC<TSettingCardProps> = ({
	icon: Icon,
	title,
	titleAs: Title = 'h3',
	description,
	children,
	className,
}) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			<div className={styles.iconWrapper}>
				<Icon className={styles.icon} />
			</div>
			<Title className={styles.title}>{title}</Title>
			<p className={styles.description}>{description}</p>
			{children}
		</div>
	)
}
