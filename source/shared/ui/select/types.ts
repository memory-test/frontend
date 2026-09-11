import type * as SelectPrimitive from '@radix-ui/react-select'

export type TSelectOption = {
	/** Значение для фильтрации (может отличаться от текста) */
	value: string
	/** Текст, который видит пользователь */
	label: string
}

export type TSelectProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Root
> & {
	options: TSelectOption[]
	placeholder?: string
	className?: string
	'aria-label'?: string
}
