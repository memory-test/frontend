export type TButtonVariant = 'default' | 'outline' | 'ghost'
export type TButtonSize = 'lg' | 'md' | 'sm'

type TButtonBaseProps = {
	variant?: TButtonVariant
	size?: TButtonSize
	/** Иконка без текста или перед текстом */
	icon?: React.ReactNode
	/** Иконка после текста */
	iconAfter?: React.ReactNode
	children?: React.ReactNode
}

// Либо кнопка (без href), либо ссылка (с href)
export type TButtonProps = TButtonBaseProps &
	(
		| (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
		| (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
				href: string
				disabled?: boolean
		  })
	)
