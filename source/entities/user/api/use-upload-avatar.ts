import { apiClient } from '@shared/api/instance'
import { normalizeError } from '@shared/api/normalize-error'
import { useMutation } from '@tanstack/react-query'

const uploadAvatarApi = async (file: File): Promise<string> => {
	const formData = new FormData()
	formData.append('avatar', file)

	try {
		const response = await apiClient
			.patch('auth/users/me/avatar/', {
				body: formData,
			})
			.json<{ avatar: string }>()

		return response.avatar
	} catch (error) {
		throw normalizeError(error)
	}
}

export const useUploadAvatar = () => {
	return useMutation({
		mutationFn: uploadAvatarApi,
	})
}
