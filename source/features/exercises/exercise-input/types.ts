import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

export type TExerciseInputProps = Omit<
	TExerciseOf<'input'>,
	'created_at' | 'difficulty' | 'type' | 'is_active' | 'answers_info'
> & {
	onPass: (payload: TPassExercisePayload<'input'>) => Promise<TResultExercise>
}
