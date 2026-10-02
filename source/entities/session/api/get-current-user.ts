import { http } from '@shared/api'
import type { IUser } from '../model/types'

interface IUserResponse {
	id: number
	email: string | null
	name: string
	birth_date: string | null
	age: number // <-- ИСПРАВЛЕНО: в OpenAPI спеке age имеет тип integer, а не string
	current_difficulty: 'easy' | 'medium' | 'hard'
	progress_percent: number
	role: 'user' | 'admin'
	is_active: boolean
	date_joined: string
	avatar: string | null
}

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
