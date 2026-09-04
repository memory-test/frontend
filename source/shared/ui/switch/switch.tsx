import clsx from 'clsx'
import { Switch as SwitchPrimitive } from 'radix-ui'
import styles from './styles.module.css'
import type { TSwitchProps } from './types'

export const Switch: React.FC<TSwitchProps> = ({ className, ...restProps }) => (
	<SwitchPrimitive.Root className={clsx(styles.root, className)} {...restProps}>
		<SwitchPrimitive.Thumb className={styles.thumb} />
	</SwitchPrimitive.Root>
)
