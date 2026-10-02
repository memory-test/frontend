import { useSessionStore } from '@entities/session'
import {
	useSetEmail,
	useUpdateProfile,
} from '@entities/user/api/use-update-profile'
import { useMemo } from 'react'
import { buildBirthDate } from './helpers'
import type { TEditForm, TUserProfile } from './types'

export const useUserProfile = () => {
	const user = useSessionStore((state) => state.user)
	const setSession = useSessionStore((state) => state.setSession)

	const updateProfileMutation = useUpdateProfile()
	const setEmailMutation = useSetEmail()

	// Мемоизируем profile, чтобы он не создавался заново при каждом рендере
	const profile: TUserProfile | null = useMemo(
		() =>
			user
				? {
						id: user.id,
						name: user.name,
						email: user.email,
						birth_date: user.birthDate,
						age: user.age ?? '', // <-- ДОБАВЛЕНО: согласно OpenAPI (age: string)
						current_difficulty: user.currentDifficulty,
						progress_percent: Number(user.progressPercent ?? 0), // <-- ДОБАВЛЕНО: согласно OpenAPI (progress_percent: string).
						role: user.role,
						is_active: user.isActive,
						date_joined: user.dateJoined,
						avatar_url: undefined,
					}
				: null,
		[user], // Пересоздаем только если user изменился
	)

	const isLoading = !user

	const updateProfile = async (form: TEditForm) => {
		if (!user) return

		try {
			// 1. Обновляем имя и дату рождения
			await updateProfileMutation.mutateAsync({
				name: form.name,
				birth_date: buildBirthDate(form.day, form.month, form.year),
			})

			// 2. Проверяем смену email
			if (form.email !== user.email) {
				// Теперь этот запрос вернет 200 OK с {"detail": "Email успешно изменён."}
				// или честно выбросит ошибку (например, при неверном пароле)
				await setEmailMutation.mutateAsync({
					current_password: form.current_password,
					new_email: form.email,
				})
			}

			// 3. Обновляем стор актуальными данными (если мы не вышли из функции выше)
			const { getCurrentUser } = await import('@entities/session')
			const updatedUser = await getCurrentUser()
			setSession(updatedUser)
		} catch (error) {
			// Если произошла ошибка (например, неверный пароль), просто пробрасываем её
			// в handleSave, чтобы UI показал понятное сообщение пользователю.
			console.error('❌ ОШИБКА ПРИ ОБНОВЛЕНИИ ПРОФИЛЯ:', error)
			throw error
		}
	}

	return {
		profile,
		isLoading,
		updateProfile,
		isPending: updateProfileMutation.isPending || setEmailMutation.isPending,
		error: updateProfileMutation.error || setEmailMutation.error,
	}
}
