import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email({ error: 'Введите корректную почту' }),
	password: z.string().min(1, { error: 'Введите пароль' }),
})

export type TLoginFormValues = z.infer<typeof loginSchema>
