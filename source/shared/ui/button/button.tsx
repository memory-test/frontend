import clsx from 'clsx'
import Link from 'next/link'
import styles from './styles.module.css'
import type { TButtonProps } from './types'

export const Button: React.FC<TButtonProps> = ({
	variant = 'default',
	size = 'md',
	icon,
	iconAfter,
	className,
	children,
	href,
	...restProps
}) => {
	const classes = clsx(styles.button, styles[variant], styles[size], className)

	const content = (
		<>
			{icon ? <span className={styles.icon}>{icon}</span> : null}
			{children ? <span>{children}</span> : null}
			{iconAfter ? <span className={styles.icon}>{iconAfter}</span> : null}
		</>
	)

	// Если передан href — рендерится семантическая ссылка
	if (href) {
		const { disabled: _disabled, ...linkProps } =
			restProps as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
				disabled?: boolean
			}

		const isDisabled = Boolean(_disabled)

		return (
			<Link
				href={href}
				className={classes}
				aria-disabled={isDisabled || undefined}
				style={isDisabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
				{...linkProps}
			>
				{content}
			</Link>
		)
	}

	// Иначе обычная кнопка
	return (
		<button
			className={classes}
			type="button"
			{...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{content}
		</button>
	)
}
