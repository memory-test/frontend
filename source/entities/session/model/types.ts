export interface IUser {
	id: number
	email: string | null
	name: string
	birthDate: string | null
	currentDifficulty: 'easy' | 'medium' | 'hard'
	role: 'user' | 'admin'
}
