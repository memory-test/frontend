// Уровень сложности
export type TDifficulty = 'easy' | 'medium' | 'hard'

// Тип задания
export type TExerciseType =
	| 'choice'
	| 'input'
	| 'ordering'
	| 'grouping'
	| 'matching'
	| 'drawing'
	| 'offline'

/**
 * Краткая информация о задании
 */
export interface IExerciseShort {
	id: number
	title: string
	description: string
	type: TExerciseType | null
	difficulty: TDifficulty
	is_active: boolean
	created_at: string
}

/**
 * Полная информация о задании
 */
export interface IExerciseFull extends IExerciseShort {
	question: string
	image?: string | null
	audio?: string | null
	answers_info: Record<string, unknown>
}

/**
 * Пагинированный ответ от сервера
 */
export interface IPaginatedResponse<T> {
	count: number
	next: string | null
	previous: string | null
	results: T[]
}

/**
 * Параметры запроса списка заданий
 */
export type TExerciseListParams = {
	difficulty?: TDifficulty
	type?: TExerciseType
	search?: string
	ordering?: string
	page?: number
	limit?: number
}
