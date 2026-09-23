import type { TExerciseOf } from '@entities/exercise'

export type TExerciseChoiceProps = Omit<
	TExerciseOf<'choice'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
>
