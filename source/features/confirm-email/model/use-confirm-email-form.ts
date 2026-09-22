'use client'

import { startSession } from '@entities/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError } from '@shared/api'
import { useRouteQueryParams } from '@shared/lib/routes'
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
	const { queryParams } = useRouteQueryParams()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TConfirmEmailFormValues>({
		resolver: zodResolver(confirmEmailSchema),
		defaultValues: {
			email: queryParams.email ?? '',
			code: queryParams.code ?? '',
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		try {
			const tokens = await confirmEmail(values)
			await startSession(tokens)
			onSuccess?.()
		} catch (error) {
			if (error instanceof ApiError && error.status === 400) {
				setError('root', { message: error.message })
				return
			}
			setError('root', {
				message: 'Не удалось подтвердить код. Попробуйте ещё раз',
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
