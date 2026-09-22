'use client'

import { startSession } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError } from '@shared/api'
import { useSearchParams } from 'next/navigation'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { confirmEmail } from '../api/confirm-email'
import type { TConfirmEmailFormValues } from './confirm-email.schema'
import { confirmEmailSchema } from './confirm-email.schema'

const getFirstErrorMessage = (errors: FieldErrors<TConfirmEmailFormValues>) =>
	Object.values(errors)[0]?.message

interface IUseConfirmEmailFormParams {
	onSuccess?: () => void
}

export const useConfirmEmailForm = ({
	onSuccess,
}: IUseConfirmEmailFormParams = {}) => {
	const searchParams = useSearchParams()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TConfirmEmailFormValues>({
		resolver: zodResolver(confirmEmailSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
			code: searchParams.get('code') ?? '',
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		try {
			const tokens = await confirmEmail(values)
			await startSession(tokens)
			onSuccess?.()
		} catch (error) {
			setError('root', {
				message:
					error instanceof ApiError
						? error.message
						: 'Не удалось подтвердить код. Попробуйте ещё раз',
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
