import clsx from 'clsx'
import { X } from 'lucide-react'
import * as Dialog from 'radix-ui/dialog'
import type React from 'react'
import styles from './styles.module.css'
import type { TModalProps } from './types'

const ModalRoot: React.FC<TModalProps> = ({
	open,
	onOpenChange,
	children,
	size = 'md',
	className,
	...props
}) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content
					className={clsx(styles.content, styles[size], className)}
				>
					{children}
					<Dialog.Close asChild className={styles.close}>
						<X size={24} />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

const ModalTitle = ({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Title>) => (
	<Dialog.Title className={clsx(styles.title, className)} {...props} />
)

const ModalDescription = ({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Description>) => (
	<Dialog.Description
		className={clsx(styles.description, className)}
		{...props}
	/>
)

export const Modal = Object.assign(ModalRoot, {
	Title: ModalTitle,
	Description: ModalDescription,
	Close: Dialog.Close,
})
