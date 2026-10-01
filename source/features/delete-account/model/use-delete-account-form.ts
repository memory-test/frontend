'use client'

import { logout } from '@entities/session'
import { useDeleteCurrentUser } from '@entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiError } from '@shared/api'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { WRONG_PASSWORD_MESSAGE } from './constants'
import type { TDeleteAccountFormValues } from './delete-account.schema'
import { deleteAccountSchema } from './delete-account.schema'

export const useDeleteAccountForm = () => {
	const deleteMutation = useDeleteCurrentUser()

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<TDeleteAccountFormValues>({
		resolver: zodResolver(deleteAccountSchema),
		defaultValues: { password: '' },
	})

	const { error, reset: resetMutation } = deleteMutation
	const isWrongPassword =
		error instanceof ApiError && Boolean(error.fieldErrors?.current_password)

	useEffect(() => {
		const subscription = watch(() => {
			if (isWrongPassword) resetMutation()
		})
		return () => subscription.unsubscribe()
	}, [watch, isWrongPassword, resetMutation])

	const onSubmit = handleSubmit((values) =>
		deleteMutation.mutate(values.password, { onSuccess: logout }),
	)

	const resetState = () => {
		deleteMutation.reset()
		reset()
	}

	return {
		register,
		onSubmit,
		passwordError:
			errors.password?.message ??
			(isWrongPassword ? WRONG_PASSWORD_MESSAGE : undefined),
		hasRequestError: deleteMutation.isError && !isWrongPassword,
		deleteMutation,
		resetState,
	}
}
