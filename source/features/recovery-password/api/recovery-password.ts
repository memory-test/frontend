import { http } from '@shared/api'

interface IResetPasswordConfirmParams {
	email: string
	code: string
	new_password: string
}

export function resetPasswordConfirm(
	params: IResetPasswordConfirmParams,
): Promise<void> {
	return http.postVoid('auth/users/reset_password_confirm/', params)
}
