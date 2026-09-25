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

export type TExerciseState = 'process' | 'result'
/**
 * Краткая информация о задании
 */
export type TExerciseShort = {
	id: number
	title: string
	description: string
	type: TExerciseType | null
	difficulty: TDifficulty
	is_active: boolean
	created_at: string
}

export type TExerciseChoiceAnswerInfo = {
	text: string
	image: string | null
	id: number
}

export type TExerciseMatchingAnswerInfo = {
	first_text: string
	first_image: string | null
	second_text: string
	second_image: string | null
}

type TExerciseFullBase = Omit<TExerciseShort, 'type'> & {
	question: string
	image?: string | null
	audio?: string | null
}

type TExerciseVariant<
	T extends TExerciseType | null,
	TAnswersInfo,
> = TExerciseFullBase & {
	type: T
	answers_info: TAnswersInfo
}

/**
 * Полная информация о задании
 */
export type TExerciseFull =
	| TExerciseVariant<'choice', TExerciseChoiceAnswerInfo[]>
	| TExerciseVariant<'input', Record<string, unknown>>
	| TExerciseVariant<'ordering', Record<string, unknown>>
	| TExerciseVariant<'grouping', Record<string, unknown>>
	| TExerciseVariant<'matching', TExerciseMatchingAnswerInfo[]>
	| TExerciseVariant<'drawing', Record<string, unknown>>
	| TExerciseVariant<'offline', Record<string, unknown>>
	| TExerciseVariant<null, Record<string, unknown>>

export type TExerciseOf<T extends TExerciseType> = Extract<
	TExerciseFull,
	{ type: T }
>

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
