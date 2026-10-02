import { http } from '@shared/api'
import type { TDifficulty } from '@shared/types'
import type { IUser } from '../model/types'
import { type IUserResponse, mapUser } from './user-dto'

export async function updateDifficulty(
	difficulty: TDifficulty,
): Promise<IUser> {
	const response = await http.patch<IUserResponse>('auth/users/me/', {
		current_difficulty: difficulty,
	})

	return mapUser(response)
}
