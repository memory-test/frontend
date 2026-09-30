import { z } from 'zod'

export const emailSchema = z
	.email({ error: 'Введите корректную почту' })
	.max(254, { error: 'Почта не длиннее 254 символов' })

export const passwordSchema = z
	.string()
	.min(8, { error: 'Пароль не короче 8 символов' })
	.max(128, { error: 'Пароль не длиннее 128 символов' })
