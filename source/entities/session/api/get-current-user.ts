import { http } from '@shared/api'
import type { IUser } from '../model/types'
import { type IUserResponse, mapUser } from './user-dto'

export async function getCurrentUser(): Promise<IUser> {
	const response = await http.get<IUserResponse>('auth/users/me/')

	return {
		id: response.id,
		email: response.email,
		name: response.name,
		birthDate: response.birth_date,
		age: response.age?.toString() ?? '',
		currentDifficulty: response.current_difficulty,
		progressPercent: response.progress_percent,
		role: response.role,
		isActive: response.is_active,
		dateJoined: response.date_joined,
		avatar: response.avatar,
	}
}
