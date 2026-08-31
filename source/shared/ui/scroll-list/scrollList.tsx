import { clsx } from 'clsx'
import { ScrollArea } from 'radix-ui'
import styles from './styles.module.css'
import type { TScrollListProps } from './types'

export const ScrollList: React.FC<TScrollListProps> = ({
	children,
	className,
}) => {
	return (
		<div className={clsx(styles.scrollList, className)}>
			<ScrollArea.Root className={styles.scrollAreaRoot} type="auto">
				<ScrollArea.Viewport className={styles.scrollAreaViewport}>
					<div className={styles.list}>{children}</div>
				</ScrollArea.Viewport>

				{/* Скроллбар */}
				<ScrollArea.Scrollbar
					className={styles.scrollAreaScrollbar}
					orientation="horizontal"
				>
					<ScrollArea.Thumb className={styles.scrollAreaThumb} />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	)
}
