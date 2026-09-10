/**
 * Типы заданий из OpenAPI спецификации
 * Основаны на схеме ExerciseShort из Memory Trainer API.yaml
 */

// Уровень сложности
export type TDifficulty = 'easy' | 'medium' | 'hard'

// Тип задания
export type TExerciseType =
	| 'choice' // Выбор ответа
	| 'input' // Ручной ввод
	| 'ordering' // Сортировка
	| 'grouping' // Группировка
	| 'matching' // Сопоставление
	| 'drawing' // Графическое
	| 'offline' // Офлайн

/**
 * Краткая информация о задании
 * Соответствует схеме ExerciseShort в OpenAPI
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
 * Соответствует схеме ExerciseFull в OpenAPI
 */
export interface IExerciseFull extends IExerciseShort {
	question: string
	image?: string | null
	audio?: string | null
	answers_info: Record<string, unknown>
}

/**
 * Пагинированный ответ от сервера
 * Соответствует схеме PaginatedExerciseShortList в OpenAPI
 */
export interface IPaginatedResponse<T> {
	count: number
	next: string | null
	previous: string | null
	results: T[]
}
