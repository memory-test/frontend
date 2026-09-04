export type TTagColor = 'primary' | 'warning' | 'error'

export type TTagProps = {
	children: React.ReactNode
	color?: TTagColor
	className?: string
}
