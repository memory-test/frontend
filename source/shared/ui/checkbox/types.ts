import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export type TCheckboxProps = React.ComponentPropsWithoutRef<
	typeof CheckboxPrimitive.Root
> & {
	label?: string
	className?: string
}
