import type { ReactElement } from 'react'

export type TExerciseCardProps = {
	title: string
	image: string
	slot: ReactElement
	onStart: (() => void) | string
	onDescription: () => void
	className?: string
}
