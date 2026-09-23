import type { ReactNode } from 'react'

export type TExerciseBaseProps = {
	id: number
	title: string
	description: string
	question: string
	onTimeStop: (time: number) => void
	onNext: () => void
	children: ReactNode
	isDisabled: boolean
	className?: string
}
