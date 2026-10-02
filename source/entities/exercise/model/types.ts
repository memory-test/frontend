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

export type TExerciseMatchingOption = {
	id: number
	text: string
	image: string | null
}

export type TExerciseMatchingAnswerInfo = {
	left: TExerciseMatchingOption[]
	right: TExerciseMatchingOption[]
}

export type TExerciseOrderingAnswerInfo = {
	id: number
	text: string
	image: string | null
}

export type TExerciseGroupingAnswerInfo = {
	items: {
		id: number
		text: string
		image: string | null
	}[]
	groups: string[]
}

type TChoiceAnswerMode = 'single_answer' | 'multiple_answers'

export type TInputAnswerMode = 'single_answer' | 'list_answer' | 'free_answer'

type TExerciseFullBase = Omit<TExerciseShort, 'type'> & {
	question: string
	image?: string | null
	audio?: string | null
}

type TExerciseVariant<
	T extends TExerciseType | null,
	TAnswersInfo,
	TAnswerMode = null,
> = TExerciseFullBase & {
	type: T
	answers_info: TAnswersInfo
	answer_mode: TAnswerMode
}

/**
 * Полная информация о задании
 */
export type TExerciseFull =
	| TExerciseVariant<'choice', TExerciseChoiceAnswerInfo[], TChoiceAnswerMode>
	| TExerciseVariant<'input', Record<string, unknown>, TInputAnswerMode>
	| TExerciseVariant<'ordering', TExerciseOrderingAnswerInfo[]>
	| TExerciseVariant<'grouping', TExerciseGroupingAnswerInfo>
	| TExerciseVariant<'matching', TExerciseMatchingAnswerInfo>
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

// Результат всегда одинаковый для всех типов заданий
export interface TResultExercise {
	score: number
	success: boolean
}

// ==========================================
// ПЕЙЛОАДЫ ДЛЯ ПРОХОЖДЕНИЯ ЗАДАНИЯ (PassRequest)
// ==========================================

// 1. Общая часть - базовый тип (соответственно OpenAPI)
type TPassExerciseBase = {
	started_at: string
	finished_at: string
	duration_seconds: number
}

type TPassExerciseMatching = {
	first_id: number
	second_id: number
}

// 2. Вариант пейлоада, зависящий от типа упражнения.
type TPassExerciseVariant<T extends TExerciseType> = T extends 'choice'
	? TPassExerciseBase & { answers_ids: number[] }
	: T extends 'input'
		? TPassExerciseBase & { answers: string[] }
		: T extends 'matching'
			? TPassExerciseBase & { pairs: TPassExerciseMatching[] }
			: T extends 'grouping'
				? TPassExerciseBase & {
						assignments: { item_id: number; group: string }[]
					}
				: T extends 'ordering'
					? TPassExerciseBase & { answers_ids: number[] }
					: TPassExerciseBase & Record<string, unknown> // Заглушка для grouping и будущих типов

// 3. Итоговый тип.
// Если тип не указан (по умолчанию = TExerciseType), это union всех вариантов (в соответствии с OpenAPI, схеме PassRequest.)
export type TPassExercisePayload<T extends TExerciseType = TExerciseType> =
	TPassExerciseVariant<T>
