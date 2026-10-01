'use client'

import { logout } from '@entities/session'
import { useDeleteCurrentUser } from '@entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { TDeleteAccountFormValues } from './delete-account.schema'
import { deleteAccountSchema } from './delete-account.schema'

export const useDeleteAccountForm = () => {
	const deleteMutation = useDeleteCurrentUser()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TDeleteAccountFormValues>({
		resolver: zodResolver(deleteAccountSchema),
		defaultValues: { password: '' },
	})

	const onSubmit = handleSubmit(() =>
		deleteMutation.mutate(undefined, { onSuccess: logout }),
	)

	const resetState = () => {
		deleteMutation.reset()
		reset()
	}

	return {
		register,
		onSubmit,
		passwordError: errors.password?.message,
		deleteMutation,
		resetState,
	}
}
