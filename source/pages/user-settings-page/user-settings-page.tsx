'use client'

import { DeleteAccount } from '@features/delete-account'
import { DifficultySettings } from '@features/difficulty-settings'
import { EditUserData } from '@features/edit-user-data'
import { NotificationSettings } from '@features/notification-settings'
import { Button } from '@shared/ui/button'
import { Surface } from '@shared/ui/surface'
import clsx from 'clsx'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import styles from './styles.module.css'

export const UserSettingsPage: React.FC = () => {
	const [isEditingProfile, setIsEditingProfile] = useState(false)

	return (
		// Добавляем класс isEditing, если режим активен
		<div
			className={clsx(
				styles.cardsSection,
				isEditingProfile && styles.isEditing,
			)}
		>
			<Button
				icon={<ArrowLeft />}
				variant={'outline'}
				onClick={() => setIsEditingProfile(false)}
				className={styles.switchStateButton}
			>
				Назад
			</Button>
			<Surface
				className={clsx(styles.card, styles.profileEditing, styles.cardTop)}
			>
				<EditUserData
					isEditing={isEditingProfile}
					onEditingChange={setIsEditingProfile}
				/>
			</Surface>

			{/* Оборачиваем остальные карточки в один контейнер */}
			<div className={styles.otherCards}>
				<Surface className={clsx(styles.card, styles.cardTop)}>
					<DifficultySettings />
				</Surface>

				<Surface
					className={styles.card}
					aria-labelledby="notification-settings-title"
				>
					<NotificationSettings />
				</Surface>

				<Surface className={styles.card}>
					<DeleteAccount />
				</Surface>
			</div>
		</div>
	)
}
