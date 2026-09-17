'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
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

	const [imgError, setImgError] = useState(false)

	if (!avatarUrl || imgError) {
		return (
			<div className={clsx(styles.avatarContainer, styles[size])}>
				<span
					className={styles.avatarLetter}
					role="img"
					aria-label={`Аватар пользователя ${name}`}
				>
					{initial}
				</span>
			</div>
		)
	}

	return (
		<div className={clsx(styles.avatarContainer, styles[size])}>
			<Image
				src={avatarUrl}
				alt={`Аватар ${name}`}
				width={dimension}
				height={dimension}
				className={styles.avatar}
				priority={size === 'lg'}
				unoptimized
				onError={() => setImgError(true)}
			/>
		</div>
	)
}
