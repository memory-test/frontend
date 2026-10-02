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
						current_difficulty: user.currentDifficulty,
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
				try {
					await setEmailMutation.mutateAsync({
						current_password: form.current_password,
						new_email: form.email,
					})
				} catch (emailError: unknown) {
					// 🚨 УМНЫЙ ХАК ДЛЯ БАГА БЭКЕНДА:
					// Если бэк вернул ошибку, но мы подозреваем, что он всё равно сохранил данные,
					// мы проверим это, запросив актуального пользователя.
					console.warn(
						'⚠️ Запрос смены email вернул ошибку. Проверяем, сохранился ли email на самом деле...',
						emailError,
					)

					const { getCurrentUser } = await import('@entities/session')
					const updatedUser = await getCurrentUser()

					// Если email в сторе теперь совпадает с тем, что мы пытались установить -> УСПЕХ!
					if (updatedUser.email === form.email) {
						console.log(
							'✅ Email успешно изменен, несмотря на некорректный ответ 400 от бэкенда!',
						)
						setSession(updatedUser)
						return // Выходим из функции успешно, НЕ пробрасывая ошибку в UI!
					}

					// Если email НЕ изменился, значит это реальная ошибка (например, неверный пароль)
					throw emailError
				}
			}

			// 3. Обновляем стор актуальными данными (если мы не вышли из функции выше)
			const { getCurrentUser } = await import('@entities/session')
			const updatedUser = await getCurrentUser()
			setSession(updatedUser)
		} catch (error) {
			console.error('❌ ОШИБКА ПРИ ОБНОВЛЕНИИ ПРОФИЛЯ:', error)
			throw error // Пробрасываем ошибку в handleSave, чтобы показать её пользователю
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
