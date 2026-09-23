import clsx from 'clsx'
import { ToggleGroup as ToggleRadix } from 'radix-ui'
import styles from './styles.module.css'
import type { TToggleGroupProps } from './types'

export const ToggleGroup: React.FC<TToggleGroupProps> = ({
	label,
	size = 'md',
	items,
	variant = 'row',
	className,
	labelClassName,
	...props
}) => {
	return (
		<div className={styles.wrapper}>
			{label && <span className={labelClassName}>{label}</span>}

			<ToggleRadix.Root className={clsx(styles.root, className)} {...props}>
				{items.map((item) => (
					<ToggleRadix.Item
						className={clsx(styles.item, styles[variant], styles[size])}
						key={item.value}
						value={item.value}
					>
						{item.content}
					</ToggleRadix.Item>
				))}
			</ToggleRadix.Root>
		</div>
	)
}
