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
	// Достаем error из хука, чтобы показывать ошибки загрузки аватара или профиля
	const {
		profile,
		isLoading,
		updateProfile,
		handleAvatarUpload,
		error: hookError,
	} = useUserProfile()

	const [error, setError] = useState<string | null>(null)
	const [form, setForm] = useState<TEditForm>({
		name: '',
		email: '',
		day: '',
		month: '',
		year: '',
		current_password: '',
	})
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
			// Локальный стейт для аватара удален. Мы берем его напрямую из profile.avatar
		}
	}, [profile])

	// Сбрасываем ошибку при начале редактирования
	useEffect(() => {
		if (isEditing) {
			setError(null)
		}
	}, [isEditing])

	const handleSave = async () => {
		setError(null)

		try {
			await updateProfile(form)
			onEditingChange(false)
		} catch (e: unknown) {
			if (e instanceof ApiError) {
				if (e.fieldErrors?.new_email?.[0]) {
					setError(e.fieldErrors.new_email[0])
					return
				}

				if (e.fieldErrors?.current_password?.[0]) {
					setError(e.fieldErrors.current_password[0])
					return
				}

				if (e.message) {
					setError(e.message)
					return
				}
			}

			setError(
				e instanceof Error
					? e.message
					: 'Ошибка при сохранении. Проверьте введенные данные.',
			)
		}
	}

	const handleCancel = () => {
		if (initialForm) {
			setForm(initialForm)
		}
		setError(null)
		onEditingChange(false)
	}

	// Обертка для загрузки аватара, чтобы поймать ошибку и показать её в UI формы
	const onAvatarUploadWrapper = async (file: File) => {
		setError(null)
		try {
			await handleAvatarUpload(file)
		} catch (e: unknown) {
			if (e instanceof ApiError) {
				// Ошибки валидации файла от бэкенда придут в fieldErrors.avatar
				const avatarError = e.fieldErrors?.avatar?.[0]
				setError(avatarError || e.message || 'Ошибка при загрузке аватара')
			} else {
				setError('Ошибка сети при загрузке аватара')
			}
		}
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
						avatar={profile.avatar ?? undefined} // Берем актуальный аватар из стора
						onAvatarUpload={onAvatarUploadWrapper} // Используем обертку с обработкой ошибок
						onChange={setForm}
						onSave={handleSave}
						onCancel={handleCancel}
						error={
							error ||
							(hookError instanceof ApiError ? hookError.message : null)
						}
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
