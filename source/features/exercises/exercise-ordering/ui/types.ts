import type { TExerciseOf } from '@entities/exercise'

export type TExerciseOrderingProps = Omit<
	TExerciseOf<'ordering'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
>
