import type { TDifficulty } from '@shared/types'

export interface IUser {
	id: number
	email: string | null
	name: string
	birthDate: string | null
	age: string
	currentDifficulty: TDifficulty
	progressPercent: number
	role: 'user' | 'admin'
	isActive: boolean
	dateJoined: string
}
