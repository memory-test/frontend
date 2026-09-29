import { http } from '@shared/api'

export const deleteCurrentUser = () => http.delete('auth/users/me/')
