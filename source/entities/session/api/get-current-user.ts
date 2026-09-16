import { http } from '@shared/api'
import type { IUser } from '../model/types'

interface IUserResponse {
	id: number
	email: string | null
	name: string
	birth_date: string | null
	current_difficulty: 'easy' | 'medium' | 'hard'
	role: 'user' | 'admin'
}

export async function getCurrentUser(): Promise<IUser> {
	const response = await http.get<IUserResponse>('auth/users/me/')

	return {
		id: response.id,
		email: response.email,
		name: response.name,
		birthDate: response.birth_date,
		currentDifficulty: response.current_difficulty,
		role: response.role,
	}
}
