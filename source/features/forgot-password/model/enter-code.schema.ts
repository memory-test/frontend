import { z } from 'zod'

export const enterCodeSchema = z.object({
	code: z
		.string()
		.trim()
		.min(1, { error: 'Введите код из письма' })
		.max(6, { error: 'Код состоит из 6 символов' }),
})

export type TEnterCodeFormValues = z.infer<typeof enterCodeSchema>
