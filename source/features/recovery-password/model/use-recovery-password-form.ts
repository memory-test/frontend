'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError } from '@shared/api'
import { useRouteQueryParams } from '@shared/lib/routes'
import { useEffect } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { resetPasswordConfirm } from '../api/recovery-password'
import type { TRecoveryPasswordFormValues } from './recovery-password.schema'
import { recoveryPasswordSchema } from './recovery-password.schema'

const getFirstErrorMessage = (
	errors: FieldErrors<TRecoveryPasswordFormValues>,
) => Object.values(errors)[0]?.message

interface IUseRecoveryPasswordFormParams {
	onSuccess?: () => void
}

export const useRecoveryPasswordForm = ({
	onSuccess,
}: IUseRecoveryPasswordFormParams = {}) => {
	const { queryParams } = useRouteQueryParams()

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<TRecoveryPasswordFormValues>({
		resolver: zodResolver(recoveryPasswordSchema),
		defaultValues: { password: '', repeatPassword: '' },
	})

	useEffect(() => {
		const subscription = watch(() => {
			if (errors.repeatPassword) clearErrors('repeatPassword')
		})
		return () => subscription.unsubscribe()
	}, [watch, errors.repeatPassword, clearErrors])

	const onSubmit = handleSubmit(async (values) => {
		try {
			await resetPasswordConfirm({
				email: queryParams.email ?? '',
				code: queryParams.code ?? '',
				new_password: values.password,
			})
			onSuccess?.()
		} catch (error) {
			if (error instanceof ApiError && error.fieldErrors?.new_password) {
				setError('password', {
					message: error.fieldErrors.new_password[0],
				})
				return
			}
			if (error instanceof ApiError && error.status === 400) {
				setError('root', { message: error.message })
				return
			}
			setError('root', {
				message: 'Не удалось сохранить пароль. Попробуйте ещё раз',
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
