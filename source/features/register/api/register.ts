import { http } from '@shared/api'
import type { TRegisterFormValues } from '../model/register.schema'

interface IRegisterResponse {
	id: number
	email: string
	name: string
	birth_date: string | null
}

export function registerUser(
	values: TRegisterFormValues,
): Promise<IRegisterResponse> {
	return http.post<IRegisterResponse>('auth/users/', values)
}
