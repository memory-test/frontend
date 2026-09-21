import { z } from 'zod'

export const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { error: 'Введите имя' })
		.max(150, { error: 'Имя не длиннее 150 символов' }),
	email: z
		.email({ error: 'Введите корректную почту' })
		.max(254, { error: 'Почта не длиннее 254 символов' }),
	password: z
		.string()
		.min(8, { error: 'Пароль не короче 8 символов' })
		.max(128, { error: 'Пароль не длиннее 128 символов' }),
})

export type TRegisterFormValues = z.infer<typeof registerSchema>
