import { useMutation } from '@tanstack/react-query'
import type { TEmailUpdatePayload, TProfileUpdatePayload } from '../model/types'
import { setUserEmail, updateUserProfile } from './user.api'

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: (payload: TProfileUpdatePayload) => updateUserProfile(payload),
	})
}

export const useSetEmail = () => {
	return useMutation({
		mutationFn: (payload: TEmailUpdatePayload) => setUserEmail(payload),
	})
}
