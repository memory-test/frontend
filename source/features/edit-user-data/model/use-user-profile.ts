import { useCallback, useEffect, useState } from 'react'
import { buildBirthDate } from './helpers'
import { MOCK_PROFILE } from './mock'
import type { TEditForm, TUserProfile } from './types'

export const useUserProfile = () => {
	const [profile, setProfile] = useState<TUserProfile | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchProfile = async () => {
			setIsLoading(true)
			await new Promise((resolve) => setTimeout(resolve, 500))
			setProfile(MOCK_PROFILE)
			setIsLoading(false)
		}
		fetchProfile()
	}, [])

	const updateProfile = useCallback(
		async (form: TEditForm) => {
			if (!profile) return

			await new Promise((resolve) => setTimeout(resolve, 500))
			const updatedProfile: TUserProfile = {
				...profile,
				name: form.name,
				birth_date: buildBirthDate(form.day, form.month, form.year),
			}
			setProfile(updatedProfile)
		},
		[profile],
	)

	const updateEmail = useCallback(
		async (form: TEditForm) => {
			if (form.email === profile?.email) return
			await new Promise((resolve) => setTimeout(resolve, 500))
			setProfile((prev) => (prev ? { ...prev, email: form.email } : null))
		},
		[profile],
	)

	return { profile, isLoading, updateProfile, updateEmail }
}
