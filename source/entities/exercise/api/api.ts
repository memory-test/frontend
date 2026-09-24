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
		return http.get<IPaginatedResponse<TExerciseShort>>('/exercises/', {
			searchParams: params,
		})
	},

	// Получить задание по ID
	getById: (id: number) => {
		return http.get<TExerciseFull>(`/exercises/${id}/`)
	},
}
