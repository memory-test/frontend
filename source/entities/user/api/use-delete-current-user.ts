import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCurrentUser } from './user.api'

export const useDeleteCurrentUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteCurrentUser,
		// TODO: добавить удаление токенов авторизации
		onSuccess: () => {
			queryClient.clear()
		},
	})
}
