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
}

export interface ISessionState {
	user: IUser | null
	isInitializing: boolean // <-- Флаг первоначальной загрузки
	setSession: (user: IUser) => void
	clearSession: () => void
	setInitializing: (value: boolean) => void // <-- Метод для управления флагом
}
