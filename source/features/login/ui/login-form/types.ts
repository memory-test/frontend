import type { TLoginFormValues } from '../../model/login.schema'

export type TLoginFormProps = {
	values: TLoginFormValues
	onChange: <K extends keyof TLoginFormValues>(
		name: K,
		value: TLoginFormValues[K],
	) => void
	onSubmit: () => void
	formError?: string
	isLoading?: boolean
}
