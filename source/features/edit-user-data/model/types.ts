// TODO(#50): Раскомментировать, когда будет генерация типов из OpenAPI
// import type { components } from '@/shared/api/schema'
// export type TUserProfile = components['schemas']['CodeUser']

// Временная заглушка (строго по схеме CodeUser из OpenAPI)
export type TUserProfile = {
	id: number
	email: string | null
	name: string
	birth_date: string | null
	age: string
	current_difficulty: 'easy' | 'medium' | 'hard'
	progress_percent: number // <-- ДОБАВЛЕНО (хотя в спеке указано string, бэкенд отдает number)
	role: 'user' | 'admin'
	is_active: boolean
	date_joined: string
	avatar?: string | null
}

// Форма редактирования
export type TEditForm = {
	name: string
	email: string
	day: string
	month: string
	year: string
	current_password: string
}
