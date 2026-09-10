import { http } from '@shared/api'
import type { IExerciseFull, IExerciseShort, IPaginatedResponse } from './types'

export const exerciseApi = {
	// Получить список заданий
	getList: (params?: {
		difficulty?: 'easy' | 'medium' | 'hard'
		type?: string
		search?: string
		ordering?: string
		page?: number
		limit?: number
	}) => {
		return http.get<IPaginatedResponse<IExerciseShort>>('/api/v1/exercises/', {
			searchParams: params,
		})
	},

	// Получить задание по ID
	getById: (id: number) => {
		return http.get<IExerciseFull>(`/api/v1/exercises/${id}/`)
	},
}
