import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TLoginFormValues } from '../../model/login.schema'

export type TLoginFormProps = {
	register: UseFormRegister<TLoginFormValues>
	errors: FieldErrors<TLoginFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
