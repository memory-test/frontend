'use client'

import { getCurrentUser, useSessionStore } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError, tokenStorage } from '@shared/api'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../api/login'
import { initialValues } from './constants'
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
		formState: { errors, isSubmitting },
	} = useForm<TLoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: initialValues,
	})

	const onSubmit = handleSubmit(async (values) => {
		setFormError(undefined)

		try {
			const tokens = await loginUser(values)
			// токен нужен в хранилище до запроса профиля - оттуда его берёт интерцептор
			tokenStorage.setTokens(tokens)

			const user = await getCurrentUser()
			setSession(tokens, user)

			onSuccess?.()
		} catch (error) {
			setFormError(
				error instanceof ApiError
					? error.message
					: 'Не удалось войти. Попробуйте ещё раз',
			)
		}
	})

	return {
		register,
		errors,
		onSubmit,
		formError,
		isLoading: isSubmitting,
	}
}
