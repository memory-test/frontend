'use client'

import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import type { TUserProfile } from '../model'
import styles from './profile-view.module.css'

type TProfileViewProps = {
	profile: TUserProfile
	onEdit: () => void
}

export const ProfileView: React.FC<TProfileViewProps> = ({
	profile,
	onEdit,
}) => {
	const formatDate = (date: string | null) => {
		if (!date) return 'не указана'
		return new Date(date).toLocaleDateString('ru-RU')
	}

	return (
		<div className={styles.profilecWrapper}>
			<Avatar name={profile.name} size="lg" avatarUrl={profile.avatar_url} />

			<div className={styles.info}>
				<h3 id="profile-title" className={styles.title}>
					Ваши данные
				</h3>
				<dl className={styles.data}>
					<dt>Имя:</dt>
					<dd>{profile.name || 'не указано'}</dd>

					<dt>Эл. почта:</dt>
					<dd>{profile.email || 'не указана'}</dd>

					<dt>Дата рождения:</dt>
					<dd>{formatDate(profile.birth_date)}</dd>
				</dl>

				<Button
					variant="default"
					className={styles.editButton}
					onClick={onEdit}
					size="sm"
				>
					Редактировать
				</Button>
			</div>
		</div>
	)
}
