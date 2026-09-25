import type { ITokens } from '@shared/api'
import { http } from '@shared/api'
import type { TConfirmEmailFormValues } from '../model/confirm-email.schema'

export function confirmEmail(
	values: TConfirmEmailFormValues,
): Promise<ITokens> {
	return http.post<ITokens>('auth/verify/', {
		...values,
		purpose: 'registration',
	})
}
