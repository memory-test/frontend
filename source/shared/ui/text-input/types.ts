import type { ComponentProps } from 'react'

export type TTextInputProps = ComponentProps<'input'> & {
	label?: string
	error?: boolean
	errorMessage?: string
}
