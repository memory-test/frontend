import type { THeadingTag } from '@shared/types'
import type { LucideIcon } from 'lucide-react'
import type { ReactElement } from 'react'

export type TSettingCardProps = {
	icon: LucideIcon
	title: string
	titleAs?: THeadingTag
	description: string
	children: ReactElement
	className?: string
}
