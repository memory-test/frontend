import clsx from 'clsx'
import Image from 'next/image'
import styles from './styles.module.css'
import type { TAvatarProps, TAvatarSize } from './types'

const getDimension = (size: TAvatarSize): number => {
	switch (size) {
		case 'sm':
			return 24
		case 'md':
			return 48
		case 'lg':
			return 180 // Максимальный размер для оптимизации next/image
		default:
			return 48
	}
}

export const Avatar: React.FC<TAvatarProps> = ({
	avatarUrl,
	name = '',
	size = 'md',
}) => {
	const initial = name.charAt(0).toUpperCase()
	const dimension = getDimension(size)

	return (
		<div className={clsx(styles.avatarContainer, styles[size])}>
			{!avatarUrl ? (
				<span className={styles.avatarLetter} role="img" aria-label={name}>
					{initial}
				</span>
			) : (
				<Image
					src={avatarUrl}
					alt={`Аватар ${name}`}
					width={dimension}
					height={dimension}
					className={styles.avatar}
					priority={size === 'lg'}
				/>
			)}
		</div>
	)
}
