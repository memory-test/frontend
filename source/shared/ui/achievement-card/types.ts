import type { THeadingTag } from '@shared/types'

export type TAchievementCardProps = {
	icon: React.ReactNode
	title: string
	description?: string
	as?: THeadingTag
}
