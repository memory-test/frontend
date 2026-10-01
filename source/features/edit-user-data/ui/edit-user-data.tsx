'use client'

import { ApiError } from '@shared/api'
import { useEffect, useState } from 'react'
import { parseBirthDate, type TEditForm, useUserProfile } from '../model'
import styles from './edit-user-data.module.css'
import { ProfileForm } from './profile-form'
import { ProfileView } from './profile-view'

// 1. Форма, в которой бэкенд возвращает ошибки
interface IErrorResponse {
	new_email?: string[]
	current_password?: string[]
	detail?: string
	message?: string
}

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
			// 2. Данные об ошибке
			let errorData: IErrorResponse | null = null

			if (e instanceof ApiError) {
				// Если ApiError хранит ответ в поле `data` (или `body`, проверить свой файл ApiError)
				errorData = (e as unknown as { data?: IErrorResponse }).data || null
			} else if (e instanceof Error && 'response' in e) {
				// Фоллбэк для сырых ошибок сетевого клиента (например, Ky)
				errorData =
					(e as unknown as { response?: { data?: IErrorResponse } }).response
						?.data || null
			}

			// 3. Проверка конкретных полей от бэкенда
			if (errorData?.new_email?.[0]) {
				setError(errorData.new_email[0])
				return
			}

			if (errorData?.current_password?.[0]) {
				setError(errorData.current_password[0])
				return
			}

			if (errorData?.detail) {
				setError(errorData.detail)
				return
			}

			// 4. Если специфичных полей нет, используем стандартное сообщение об ошибке
			if (e instanceof Error) {
				if (
					e.message.includes('Unexpected end of JSON') ||
					e.message.includes('400')
				) {
					setError(
						'Ошибка: проверьте правильность текущего пароля и формат нового email.',
					)
					return
				}

				// Показываем сообщение, если оно не является сырой технической строкой
				if (
					!e.message.includes('Request failed') &&
					!e.message.includes('fetch')
				) {
					setError(e.message)
					return
				}
			}

			// 5. Фоллбэк на случай совсем непредвиденных обстоятельств
			setError('Ошибка при сохранении. Проверьте введенные данные.')
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
