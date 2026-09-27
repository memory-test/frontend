import type { TExerciseOf } from '@entities/exercise'

// Только ту часть TPassExercisePayload, которая относится к input
export type TInputCheckPayload = {
	started_at: string
	finished_at: string
	duration_seconds: number
	answers: string[]
}

export type TExerciseInputProps = Omit<
	TExerciseOf<'input'>,
	'created_at' | 'difficulty' | 'type' | 'is_active' | 'answers_info'
> & {
	onPass: (payload: TInputCheckPayload) => Promise<TResultExercise>
}

// Строго по схеме ResultExercise из Memory Trainer API.yaml
export interface TResultExercise {
	score: number
	success: boolean
}
