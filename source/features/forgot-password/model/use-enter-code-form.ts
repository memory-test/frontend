'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { TEnterCodeFormValues } from './enter-code.schema'
import { enterCodeSchema } from './enter-code.schema'

interface IUseEnterCodeFormParams {
	email: string
}

export const useEnterCodeForm = ({ email }: IUseEnterCodeFormParams) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TEnterCodeFormValues>({
		resolver: zodResolver(enterCodeSchema),
		defaultValues: { code: '' },
	})

	const onSubmit = handleSubmit((values) => {
		router.push(
			createUrl(routerPath.recoveryPassword, undefined, {
				email,
				code: values.code,
			}),
		)
	})

	return { register, onSubmit, errors }
}
