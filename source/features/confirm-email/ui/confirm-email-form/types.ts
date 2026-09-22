import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TConfirmEmailFormValues } from '../../model/confirm-email.schema'

export type TConfirmEmailFormProps = {
	register: UseFormRegister<TConfirmEmailFormValues>
	errors: FieldErrors<TConfirmEmailFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
