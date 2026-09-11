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
	/** Опции для выбора */
	options: TSelectOption[]
	/** Placeholder, если ничего не выбрано */
	placeholder?: string
	/** Дополнительный CSS-класс для триггера */
	className?: string
	/** aria-label для доступности */
	'aria-label'?: string
}
