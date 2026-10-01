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
