import type {
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { exerciseApi } from '../api'

export const usePassExercise = (exerciseId: number) => {
	const queryClient = useQueryClient()

	return useMutation<TResultExercise, Error, TPassExercisePayload>({
		mutationFn: (payload) => exerciseApi.pass(exerciseId, payload),
		onSuccess: () => {
			// Инвалидируем кэш истории, чтобы данные обновились
			queryClient.invalidateQueries({ queryKey: ['progress', 'history'] })
		},
	})
}
