'use client'

import { useQuery } from '@tanstack/react-query'
import { exerciseApi } from '../api'

export const useGetExerciseById = (id: number) => {
	return useQuery({
		queryKey: ['exercise', id],
		queryFn: () => exerciseApi.getById(id),
	})
}
