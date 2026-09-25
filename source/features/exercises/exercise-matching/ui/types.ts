import type { TExerciseOf } from '@entities/exercise'

export type TExerciseMatchingProps = Omit<
	TExerciseOf<'matching'>,
	'type' | 'difficulty' | 'is_active' | 'created_at'
>
