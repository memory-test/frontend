import type * as Dialog from 'radix-ui/dialog'
import type React from 'react'

export type TModalProps = React.ComponentProps<typeof Dialog.Root> & {
	className?: string
	size?: 'sm' | 'md' | 'lg'
}
