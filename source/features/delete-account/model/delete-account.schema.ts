import { z } from 'zod'

export const deleteAccountSchema = z.object({
	password: z.string().min(1, { error: 'Введите пароль' }),
})

export type TDeleteAccountFormValues = z.infer<typeof deleteAccountSchema>
