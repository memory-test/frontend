import { emailSchema, passwordSchema } from '@shared/lib/auth-validation'
import { z } from 'zod'

export const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { error: 'Введите имя' })
		.max(150, { error: 'Имя не длиннее 150 символов' }),
	email: emailSchema,
	password: passwordSchema,
})

export type TRegisterFormValues = z.infer<typeof registerSchema>
