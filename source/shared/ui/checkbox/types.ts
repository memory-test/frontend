import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export interface ICheckboxProps
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	label?: string
	className?: string
}

export type TCheckboxProps = ICheckboxProps
