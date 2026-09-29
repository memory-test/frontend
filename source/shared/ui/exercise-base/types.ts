import type { ReactNode } from 'react'
import type { TTimerResult } from '../timer'

export type TExerciseBaseProps = {
	id: number
	title: string
	description: string
	question: string
	onNext: (timing: TTimerResult) => void
	children: ReactNode
	isDisabled: boolean
	className?: string
}
