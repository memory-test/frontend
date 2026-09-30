import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TRecoveryPasswordFormValues } from '../../model/recovery-password.schema'

export type TRecoveryPasswordFormProps = {
	register: UseFormRegister<TRecoveryPasswordFormValues>
	errors: FieldErrors<TRecoveryPasswordFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
