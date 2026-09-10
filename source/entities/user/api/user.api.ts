import { http } from '@shared/api'

export const deleteCurrentUser = () => http.delete('api/v1/auth/users/me/')
