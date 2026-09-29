'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { TEnterCodeFormValues } from './enter-code.schema'
import { enterCodeSchema } from './enter-code.schema'

interface IUseEnterCodeFormParams {
	onSuccess: (code: string) => void
}

export const useEnterCodeForm = ({ onSuccess }: IUseEnterCodeFormParams) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TEnterCodeFormValues>({
		resolver: zodResolver(enterCodeSchema),
		defaultValues: { code: '' },
	})

	const onSubmit = handleSubmit((values) => onSuccess(values.code))

	return { register, onSubmit, errors }
}
