// entities/exercise/api/hooks/use-pass-exercise.ts

import type {
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise/model/types'
import { http } from '@shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const usePassExercise = (exerciseId: number) => {
	const queryClient = useQueryClient()

	return useMutation<TResultExercise, Error, TPassExercisePayload>({
		mutationFn: (payload) => {
			return http.post<TResultExercise>(
				`/exercises/${exerciseId}/pass/`,
				payload,
			)
		},
		onSuccess: () => {
			// Инвалидируем кэш истории, чтобы данные обновились
			queryClient.invalidateQueries({ queryKey: ['progress', 'history'] })
		},
	})
}
