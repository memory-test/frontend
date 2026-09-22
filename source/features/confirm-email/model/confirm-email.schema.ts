import { z } from 'zod'

export const confirmEmailSchema = z.object({
	email: z.email({ error: 'Введите корректную почту' }),
	code: z
		.string()
		.trim()
		.min(1, { error: 'Введите код из письма' })
		.max(6, { error: 'Код состоит из 6 символов' }),
})

export type TConfirmEmailFormValues = z.infer<typeof confirmEmailSchema>
