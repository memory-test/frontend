import { http } from '@shared/api'
import type {
	IPaginatedResponse,
	TExerciseFull,
	TExerciseListParams,
	TExerciseShort,
} from '..//model/types'

export const exerciseApi = {
	// Получить список заданий
	getList: (params?: TExerciseListParams) => {
		return http.get<IPaginatedResponse<TExerciseShort>>('/api/v1/exercises/', {
			searchParams: params,
		})
	},

	// Получить задание по ID
	getById: (id: number) => {
		return http.get<TExerciseFull>(`/api/v1/exercises/${id}/`)
	},
}
