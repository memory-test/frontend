'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { initialValues } from './constants'
import type { TRegisterFormValues } from './register.schema'
import { registerSchema } from './register.schema'

const getFirstErrorMessage = (errors: FieldErrors<TRegisterFormValues>) =>
	Object.values(errors)[0]?.message

export const useRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TRegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: initialValues,
	})

	const onSubmit = handleSubmit(() => undefined)

	return {
		register,
		onSubmit,
		errors,
		formError: getFirstErrorMessage(errors),
		isLoading: isSubmitting,
	}
}
