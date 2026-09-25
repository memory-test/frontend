import type { TRegisterFormValues } from './register.schema'

export const initialValues: TRegisterFormValues = {
	name: '',
	email: '',
	password: '',
}
export const EMAIL_TAKEN_MESSAGE = 'Аккаунт с этой почтой уже существует'
