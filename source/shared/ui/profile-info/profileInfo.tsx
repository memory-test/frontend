import { Avatar } from '@shared/ui/avatar'
import styles from './styles.module.css'
import type { TProfileInfo } from './types'

export const ProfileInfo: React.FC<TProfileInfo> = ({
	avatarUrl,
	name = '',
	size = 'md',
}) => {
	return (
		<div className={styles.profile}>
			<Avatar avatarUrl={avatarUrl} name={name} size={size} />
			<p className={styles.name}>{name}</p>
		</div>
	)
}
