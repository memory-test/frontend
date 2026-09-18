import type { TLoginFormValues } from './login.schema'

export const initialValues: TLoginFormValues = {
	email: '',
	password: '',
}

export const GENERAL_ERROR_MESSAGE = 'Проверьте электронную почту или пароль'
