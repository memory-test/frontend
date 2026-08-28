import styles from './styles.module.css'
import type { TAchievementCardProps } from './types'

export const AchievementCard: React.FC<TAchievementCardProps> = ({
	icon,
	title,
	description,
}) => (
	<div className={styles.achievementCard}>
		<div className={styles.icon}>
			{typeof icon === 'string' ? <span>{icon}</span> : icon}
		</div>
		<h2 className={styles.title}>{title}</h2>
		{description && <p className={styles.description}>{description}</p>}
	</div>
)
