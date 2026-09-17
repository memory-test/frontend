import type { UseFormRegister } from 'react-hook-form'
import type { TLoginFormValues } from '../../model/login.schema'

export type TLoginFormProps = {
	register: UseFormRegister<TLoginFormValues>
	onSubmit: (event: React.FormEvent) => void
	formError?: string
	isLoading?: boolean
}
