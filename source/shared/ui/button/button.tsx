import clsx from 'clsx'
import styles from './styles.module.css'
import type { TButtonProps } from './types'

export const Button: React.FC<TButtonProps> = ({
	variant = 'default',
	size = 'md',
	icon,
	className,
	children,
	iconAfter,
	type = 'button',
	...restProps
}) => (
	<button
		className={clsx(styles.button, styles[variant], styles[size], className)}
		type={type}
		{...restProps}
	>
		{/* Если кнопка только с иконкой (без текста), скринридеру нечего будет прочитать. В таких местах вызывающая сторона должна передавать aria-label */}
		{icon ? <span className={styles.icon}>{icon}</span> : null}
		{children ? <span>{children}</span> : null}
		{iconAfter ? <span className={styles.icon}>{iconAfter}</span> : null}
	</button>
)
