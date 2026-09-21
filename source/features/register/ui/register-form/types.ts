import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TRegisterFormValues } from '../../model/register.schema'

export type TRegisterFormProps = {
	register: UseFormRegister<TRegisterFormValues>
	errors: FieldErrors<TRegisterFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
