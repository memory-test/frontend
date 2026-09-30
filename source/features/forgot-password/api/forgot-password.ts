import { http } from '@shared/api'
import type { TForgotPasswordFormValues } from '../model/forgot-password.schema'

export function requestPasswordReset(
	values: TForgotPasswordFormValues,
): Promise<void> {
	return http.postVoid('auth/users/reset_password/', values)
}
