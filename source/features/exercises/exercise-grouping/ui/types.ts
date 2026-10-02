import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

// Элемент с состоянием (в какой группе)
export type TGroupingItemState = {
	id: number
	text: string
	image: string | null
	group: string | null
}

export type TExerciseGroupingProps = Omit<
	TExerciseOf<'grouping'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
> & {
	onPass: (
		payload: TPassExercisePayload<'grouping'>,
	) => Promise<TResultExercise>
}
