import { http } from '@shared/api'
import type { IUser } from '../model/types'
import { type IUserResponse, mapUser } from './user-dto'

export async function getCurrentUser(): Promise<IUser> {
	const response = await http.get<IUserResponse>('auth/users/me/')

	return mapUser(response)
}
