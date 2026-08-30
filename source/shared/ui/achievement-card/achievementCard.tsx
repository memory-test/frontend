import styles from './styles.module.css'
import type { TAchievementCardProps } from './types'

export const AchievementCard: React.FC<TAchievementCardProps> = ({
	icon,
	title,
	description,
	as: Tag = 'div', // дефолтное значение
}) => (
	<div className={styles.achievementCard}>
		<div className={styles.icon}>{icon}</div>
		{/* Динамический тег */}
		<Tag className={styles.title}>{title}</Tag>
		{description && <p className={styles.description}>{description}</p>}
	</div>
)
