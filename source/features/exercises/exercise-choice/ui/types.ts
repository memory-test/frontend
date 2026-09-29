import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

export type TExerciseChoiceProps = Omit<
	TExerciseOf<'choice'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
> & {
	onPass: (payload: TPassExercisePayload<'choice'>) => Promise<TResultExercise>
}
