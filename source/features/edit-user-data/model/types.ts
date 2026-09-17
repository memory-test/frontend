// TODO(#50): Раскомментировать, когда будет генерация типов из OpenAPI
// import type { components } from '@/shared/api/schema'
// export type TUserProfile = components['schemas']['CodeUser']

// Временная заглушка (строго по схеме CodeUser из OpenAPI)
export type TUserProfile = {
	id: number
	email: string | null
	name: string
	birth_date: string | null
	current_difficulty: 'easy' | 'medium' | 'hard'
	role: 'user' | 'admin'
	is_active: boolean
	date_joined: string
	avatar_url?: string | undefined
}

// Пейлоад для PATCH /api/v1/auth/users/me/
export type TProfileUpdatePayload = {
	name?: string
	birth_date?: string | null
}

// Пейлоад для POST /api/v1/auth/users/set_email/
export type TEmailUpdatePayload = {
	current_password: string
	new_email: string
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
