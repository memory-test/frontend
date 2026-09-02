import Image from 'next/image'
import styles from './styles.module.css'
import type { TProfileInfo } from './types'

export const ProfileInfo: React.FC<TProfileInfo> = ({
	avatarUrl,
	name = '',
}) => {
	const initial = name.charAt(0).toUpperCase()

	return (
		<div className={styles.profile}>
			<div className={styles.avatarContainer}>
				{!avatarUrl ? (
					<span className={styles.avatarLetter} role="img" aria-label={name}>
						{initial}
					</span>
				) : (
					<Image
						src={avatarUrl}
						alt={`Аватар ${name}`}
						width={48}
						height={48}
						className={styles.avatar}
						priority
					/>
				)}
			</div>
			<p className={styles.name}>{name}</p>
		</div>
	)
}
