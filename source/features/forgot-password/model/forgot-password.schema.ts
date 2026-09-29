import { emailSchema } from '@shared/lib/auth-validation'
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
	email: emailSchema,
})

export type TForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
