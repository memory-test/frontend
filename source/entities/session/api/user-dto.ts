import type { TDifficulty } from '@shared/types'
import type { IUser } from '../model/types'

export interface IUserResponse {
	id: number
	email: string | null
	name: string
	birth_date: string | null
	age: string
	current_difficulty: TDifficulty
	progress_percent: number
	role: 'user' | 'admin'
	is_active: boolean
	date_joined: string
}

export const mapUser = (response: IUserResponse): IUser => ({
	id: response.id,
	email: response.email,
	name: response.name,
	birthDate: response.birth_date,
	age: response.age,
	currentDifficulty: response.current_difficulty,
	progressPercent: response.progress_percent,
	role: response.role,
	isActive: response.is_active,
	dateJoined: response.date_joined,
})
