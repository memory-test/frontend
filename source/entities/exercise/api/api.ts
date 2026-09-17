import { http } from '@shared/api'
import type {
	IExerciseFull,
	IExerciseShort,
	IPaginatedResponse,
	TExerciseListParams,
} from '..//model/types'

export const exerciseApi = {
	// Получить список заданий
	getList: (params?: TExerciseListParams) => {
		return http.get<IPaginatedResponse<IExerciseShort>>('/api/v1/exercises/', {
			searchParams: params,
		})
	},

	// Получить задание по ID
	getById: (id: number) => {
		return http.get<IExerciseFull>(`/api/v1/exercises/${id}/`)
	},
}
