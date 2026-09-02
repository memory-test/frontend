import type { ReactNode } from 'react'

export type TTagColor = 'primary' | 'warning' | 'error'

export type THighlightProps = {
	title: string
	subtitle: string
	tagText: string
	tagColor?: TTagColor
	actionSlot: ReactNode
	as?: 'h1' | 'h2' | 'h3' | 'h4'
	className?: string
}
