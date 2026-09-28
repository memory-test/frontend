import { http } from '@shared/api'
import type {
	IPaginatedResponse,
	TExerciseFull,
	TExerciseListParams,
	TExerciseShort,
	TPassExercisePayload,
	TResultExercise,
} from '../model/types'

export const exerciseApi = {
	// Получить список заданий
	getList: (params?: TExerciseListParams) => {
		return http.get<IPaginatedResponse<TExerciseShort>>('/exercises/', {
			searchParams: params,
		})
	},

	// Получить задание по ID
	getById: (id: number) => {
		return http.get<TExerciseFull>(`/exercises/${id}/`)
	},

	// Пройти задание
	pass: (id: number, payload: TPassExercisePayload) => {
		return http.post<TResultExercise>(`/exercises/${id}/pass/`, payload)
	},
}
