'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { requestPasswordReset } from '../api/forgot-password'
import { SEND_CODE_ERROR_MESSAGE } from './constants'
import type { TForgotPasswordFormValues } from './forgot-password.schema'
import { forgotPasswordSchema } from './forgot-password.schema'

interface IUseForgotPasswordFormParams {
	onSuccess?: (email: string) => void
}

export const useForgotPasswordForm = ({
	onSuccess,
}: IUseForgotPasswordFormParams = {}) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: '' },
	})

	const onSubmit = handleSubmit(async (values) => {
		try {
			await requestPasswordReset(values)
			onSuccess?.(values.email)
		} catch {
			setError('root', { message: SEND_CODE_ERROR_MESSAGE })
		}
	})

	return {
		register,
		onSubmit,
		errors,
		formError: errors.root?.message ?? errors.email?.message,
		isLoading: isSubmitting,
	}
}
