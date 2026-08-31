import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'
import styles from './styles.module.css'
import type { TScrollListProps } from './types'

export const ScrollList: React.FC<TScrollListProps> = ({
	children,
	className,
}) => {
	return (
		<div className={clsx(styles.scrollList, className)}>
			<ScrollAreaPrimitive.Root className={styles.scrollAreaRoot} type="auto">
				<ScrollAreaPrimitive.Viewport className={styles.scrollAreaViewport}>
					<div className={styles.list}>{children}</div>
				</ScrollAreaPrimitive.Viewport>

				{/* Скроллбар */}
				<ScrollAreaPrimitive.Scrollbar
					className={styles.scrollAreaScrollbar}
					orientation="horizontal"
				>
					<ScrollAreaPrimitive.Thumb className={styles.scrollAreaThumb} />
				</ScrollAreaPrimitive.Scrollbar>
			</ScrollAreaPrimitive.Root>
		</div>
	)
}
