import { passwordSchema } from '@shared/lib/auth-validation'
import { z } from 'zod'

export const recoveryPasswordSchema = z
	.object({
		password: passwordSchema,
		repeatPassword: passwordSchema,
	})
	.refine((data) => data.password === data.repeatPassword, {
		error: 'Пароли не совпадают',
		path: ['repeatPassword'],
	})

export type TRecoveryPasswordFormValues = z.infer<typeof recoveryPasswordSchema>
