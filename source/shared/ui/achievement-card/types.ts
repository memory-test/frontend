/** Допустимые теги для заголовка */
export type THeadingTag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'div'
	| 'span'

export type TAchievementCardProps = {
	icon: React.ReactNode
	title: string
	description?: string
	as?: THeadingTag
}
