import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

export type TExerciseOrderingProps = Omit<
	TExerciseOf<'ordering'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
> & {
	onPass: (payload: TPassExercisePayload) => Promise<TResultExercise>
}
