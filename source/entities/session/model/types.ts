export interface IUser {
	id: number
	email: string | null
	name: string
	birthDate: string | null
	age: string
	currentDifficulty: 'easy' | 'medium' | 'hard'
	progressPercent: number
	role: 'user' | 'admin'
	isActive: boolean
	dateJoined: string
	avatar?: string | null
}
