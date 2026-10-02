import { http } from '@shared/api'
import type { TEmailUpdatePayload, TProfileUpdatePayload } from '../model/types'

export const deleteCurrentUser = (password: string) =>
	http.delete('auth/users/me/', { json: { current_password: password } })

export const updateUserProfile = (payload: TProfileUpdatePayload) => {
	return http.patch<unknown>('auth/users/me/', payload)
}

export const setUserEmail = (payload: TEmailUpdatePayload) => {
	return http.post<unknown>('auth/users/set_email/', payload)
}
