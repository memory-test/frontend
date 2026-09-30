import styles from './styles.module.css'
import type { TAuthCardProps } from './types'

export const AuthCard: React.FC<TAuthCardProps> = ({
	title,
	subtitle,
	compactHeight,
	children,
}) => (
	<main className={styles.main}>
		<div
			className={styles.card}
			style={
				compactHeight
					? ({
							'--card-min-height': `${compactHeight}px`,
							'--card-justify': 'flex-start',
						} as React.CSSProperties)
					: undefined
			}
		>
			<div className={styles.intro}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			{children}
		</div>
	</main>
)
