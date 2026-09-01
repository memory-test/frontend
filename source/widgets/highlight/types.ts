import type { ReactNode } from 'react'

export type TTagColor = 'primary' | 'warning' | 'error'

export type THighlightProps = {
	title: string
	subtitle: string
	tagText: string
	tagColor?: TTagColor
	actionSlot: ReactNode
	className?: string
}
