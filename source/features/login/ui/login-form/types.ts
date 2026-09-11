export type TLoginFormValues = {
	email: string
	password: string
}

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
