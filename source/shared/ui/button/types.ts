export type TButtonVariant = 'default' | 'outline' | 'ghost'
export type TButtonSize = 'lg' | 'md' | 'sm'

export type TButtonProps = React.ComponentProps<'button'> & {
	variant?: TButtonVariant
	size?: TButtonSize
	/** Иконка без текста или перед текстом */
	icon?: React.ReactNode
	/** Иконка после текста */
	iconAfter?: React.ReactNode
}
