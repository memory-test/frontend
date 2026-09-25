import type { ITokens } from '@shared/api'
import { http } from '@shared/api'
import type { TLoginFormValues } from '../model/login.schema'

export function loginUser(values: TLoginFormValues): Promise<ITokens> {
	return http.post<ITokens>('auth/jwt/create/', values)
}
