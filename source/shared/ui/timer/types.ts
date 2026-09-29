export type TTimerResult = {
	startedAt: string
	finishedAt: string
	durationSeconds: number
}

export type TTimerProps = {
	isRunning: boolean
	onStop?: (result: TTimerResult) => void
	className?: string
}
