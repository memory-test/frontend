'use client'

import { getCurrentUser, useSessionStore } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError, tokenStorage } from '@shared/api'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../api/login'
import { GENERAL_ERROR_MESSAGE, initialValues } from './constants'
import type { TLoginFormValues } from './login.schema'
import { loginSchema } from './login.schema'

interface IUseLoginFormParams {
	onSuccess?: () => void
}

export const useLoginForm = ({ onSuccess }: IUseLoginFormParams = {}) => {
	const [formError, setFormError] = useState<string | undefined>(undefined)
	const setSession = useSessionStore((state) => state.setSession)

	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitting },
	} = useForm<TLoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: initialValues,
	})

	// как только пользователь начал править любое поле - гасим ошибку с прошлой отправки
	useEffect(() => {
		const subscription = watch(() => setFormError(undefined))
		return () => subscription.unsubscribe()
	}, [watch])

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				const tokens = await loginUser(values)
				// токен нужен в хранилище до запроса профиля - оттуда его берёт интерцептор
				tokenStorage.setTokens(tokens)

				const user = await getCurrentUser()
				setSession(user)

				onSuccess?.()
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) {
					setFormError(GENERAL_ERROR_MESSAGE)
					return
				}
				setFormError('Не удалось войти. Попробуйте ещё раз')
			}
		},
		() => setFormError(GENERAL_ERROR_MESSAGE),
	)

	return {
		register,
		onSubmit,
		formError,
		isLoading: isSubmitting,
	}
}
