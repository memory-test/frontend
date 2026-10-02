import type { TDifficulty } from '@shared/types'
import { useMutation } from '@tanstack/react-query'
import { useSessionStore } from '../../model/store'
import type { IUser } from '../../model/types'
import { updateDifficulty } from '../update-difficulty'

type TContext = { previous?: TDifficulty }

export const useUpdateDifficulty = () =>
	useMutation<IUser, Error, TDifficulty, TContext>({
		mutationFn: updateDifficulty,

		onMutate: (next) => {
			const { user, updateUser } = useSessionStore.getState()
			const previous = user?.currentDifficulty

			updateUser({ currentDifficulty: next })

			return { previous }
		},

		onSuccess: (user) => {
			useSessionStore.getState().setSession(user)
		},

		onError: (_error, _next, context) => {
			if (context?.previous) {
				useSessionStore
					.getState()
					.updateUser({ currentDifficulty: context.previous })
			}
		},
	})
