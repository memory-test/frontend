'use client'

import { ApiError } from '@shared/api'
import { useEffect, useState } from 'react'
import { parseBirthDate, type TEditForm, useUserProfile } from '../model'
import styles from './edit-user-data.module.css'
import { ProfileForm } from './profile-form'
import { ProfileView } from './profile-view'

type TEditUserDataProps = {
	isEditing: boolean
	onEditingChange: (value: boolean) => void
}

export const EditUserData: React.FC<TEditUserDataProps> = ({
	isEditing,
	onEditingChange,
}) => {
	const { profile, isLoading, updateProfile } = useUserProfile()
	const [error, setError] = useState<string | null>(null)

	const [form, setForm] = useState<TEditForm>({
		name: '',
		email: '',
		day: '',
		month: '',
		year: '',
		current_password: '',
	})

	const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
	const [initialForm, setInitialForm] = useState<TEditForm | null>(null)

	useEffect(() => {
		if (profile) {
			const date = parseBirthDate(profile.birth_date)
			const data = {
				name: profile.name ?? '',
				email: profile.email ?? '',
				...date,
				current_password: '',
			}
			setInitialForm(data)
			setForm(data)
			setAvatarUrl(profile.avatar_url ?? undefined)
		}
	}, [profile])

	const handleSave = async () => {
		setError(null)

		try {
			await updateProfile(form)
			onEditingChange(false)
		} catch (e: unknown) {
			// ИСПРАВЛЕНО: используем правильные свойства ApiError (fieldErrors и message)
			if (e instanceof ApiError) {
				// e.fieldErrors имеет тип Record<string, string[]> | undefined
				if (e.fieldErrors?.new_email?.[0]) {
					setError(e.fieldErrors.new_email[0])
					return
				}

				if (e.fieldErrors?.current_password?.[0]) {
					setError(e.fieldErrors.current_password[0])
					return
				}

				// Если есть общая ошибка (например, detail от бэкенда)
				if (e.message) {
					setError(e.message)
					return
				}
			}

			// Фоллбэк на случай непредвиденных сетевых ошибок
			setError(
				e instanceof Error
					? e.message
					: 'Ошибка при сохранении. Проверьте введенные данные.',
			)
		}
	}

	const handleCancel = () => {
		if (avatarUrl?.startsWith('blob:')) {
			URL.revokeObjectURL(avatarUrl)
		}
		if (initialForm) {
			setForm(initialForm)
		}
		setAvatarUrl(profile?.avatar_url ?? undefined)
		setError(null)
		onEditingChange(false)
	}

	const handleAvatarChange = (url: string) => {
		if (avatarUrl?.startsWith('blob:')) {
			URL.revokeObjectURL(avatarUrl)
		}
		setAvatarUrl(url)
	}

	if (isLoading) return <div>Загрузка...</div>
	if (!profile) return <div>Не удалось загрузить профиль</div>

	return (
		<>
			{isEditing ? (
				<section
					className={styles.editProfileCard}
					aria-labelledby="profile-title"
				>
					<ProfileForm
						form={form}
						initialForm={initialForm}
						avatarUrl={avatarUrl}
						onAvatarChange={handleAvatarChange}
						onChange={setForm}
						onSave={handleSave}
						onCancel={handleCancel}
						error={error}
					/>
				</section>
			) : (
				<section
					className={styles.viewProfileCard}
					aria-labelledby="profile-title"
				>
					<ProfileView profile={profile} onEdit={() => onEditingChange(true)} />
				</section>
			)}
		</>
	)
}
