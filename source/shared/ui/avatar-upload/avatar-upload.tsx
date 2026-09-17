'use client'

import { Avatar } from '@shared/ui/avatar'
import { Camera } from 'lucide-react'
import { useRef } from 'react'
import styles from './styles.module.css'
import type { TAvatarUploadProps } from './types'

// Константы валидации
const MAX_FILE_SIZE = 1.5 * 1024 * 1024 // 1.5 МБ в байтах
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const AvatarUpload: React.FC<TAvatarUploadProps> = ({
	avatarUrl,
	name = '',
	size = 'lg',
	onChange,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!ALLOWED_TYPES.includes(file.type)) {
			e.target.value = ''
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			e.target.value = ''
			return
		}

		onChange?.(file)

		e.target.value = ''
	}

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<button
			type="button"
			className={styles.container}
			aria-label="Изменить аватар"
			onClick={handleClick}
		>
			<div className={styles.avatarWrapper}>
				<Avatar name={name} size={size} avatarUrl={avatarUrl} />

				<div className={styles.cameraOverlay}>
					<Camera size={24} />
				</div>
			</div>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp"
				onChange={handleFileChange}
				className={styles.fileInput}
				aria-hidden="true"
				tabIndex={-1}
			/>
		</button>
	)
}
