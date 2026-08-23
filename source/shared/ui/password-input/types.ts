import type { ComponentProps } from 'react'

export type TPasswordInputProps = Omit<
	ComponentProps<'input'>,
	'autoComplete'
> & {
	label?: string
	autoComplete?: 'current-password' | 'new-password'
}
