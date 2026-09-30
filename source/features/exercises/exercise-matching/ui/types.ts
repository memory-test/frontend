import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

export type TExerciseMatchingProps = Omit<
	TExerciseOf<'matching'>,
	'type' | 'difficulty' | 'is_active' | 'created_at' | 'answer_mode'
> & {
	onPass: (
		payload: TPassExercisePayload<'matching'>,
	) => Promise<TResultExercise>
}
