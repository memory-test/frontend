'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError } from '@shared/api'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { registerUser } from '../api/register'
import { EMAIL_TAKEN_MESSAGE, initialValues } from './constants'
import type { TRegisterFormValues } from './register.schema'
import { registerSchema } from './register.schema'

const getFirstErrorMessage = (errors: FieldErrors<TRegisterFormValues>) =>
	Object.values(errors)[0]?.message

interface IUseRegisterFormParams {
	onSuccess?: (email: string) => void
}

export const useRegisterForm = ({ onSuccess }: IUseRegisterFormParams = {}) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TRegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: initialValues,
	})

	const onSubmit = handleSubmit(async (values) => {
		try {
			await registerUser(values)
			onSuccess?.(values.email)
		} catch (error) {
			if (error instanceof ApiError && error.fieldErrors) {
				for (const [field, messages] of Object.entries(error.fieldErrors)) {
					setError(field as keyof TRegisterFormValues, {
						message: field === 'email' ? EMAIL_TAKEN_MESSAGE : messages[0],
					})
				}
				return
			}
			setError('root', {
				message: 'Не удалось зарегистрироваться. Попробуйте ещё раз',
			})
		}
	})

	return {
		register,
		onSubmit,
		errors,
		formError: errors.root?.message ?? getFirstErrorMessage(errors),
		isLoading: isSubmitting,
	}
}
