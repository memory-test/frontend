import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TForgotPasswordFormValues } from '../../model/forgot-password.schema'

export type TForgotPasswordFormProps = {
	register: UseFormRegister<TForgotPasswordFormValues>
	errors: FieldErrors<TForgotPasswordFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
