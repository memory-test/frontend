import type {
	TExerciseOf,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'

export type TGroupingAnswerInfo = {
	items: {
		id: number
		text: string
		image: string | null
	}[]
	groups: string[]
}

// Элемент с состоянием (в какой группе)
export type TGroupingItemState = {
	id: number
	text: string
	image: string | null
	group: string | null // строка (имя группы)
}

export type TExerciseGroupingProps = Omit<
	TExerciseOf<'grouping'>,
	'created_at' | 'difficulty' | 'type' | 'is_active'
> & {
	onPass: (
		payload: TPassExercisePayload<'grouping'>,
	) => Promise<TResultExercise>
}
