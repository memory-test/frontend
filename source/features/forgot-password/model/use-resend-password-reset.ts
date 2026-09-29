'use client'

import { useCountdown } from '@shared/lib/use-countdown'
import { useState } from 'react'
import { requestPasswordReset } from '../api/forgot-password'
import { RESEND_CODE_TIMEOUT_SECONDS } from './constants'

interface IUseResendPasswordResetParams {
	email: string
}

export const useResendPasswordReset = ({
	email,
}: IUseResendPasswordResetParams) => {
	const { secondsLeft, isFinished, restart } = useCountdown(
		RESEND_CODE_TIMEOUT_SECONDS,
	)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>()

	const resend = async () => {
		setIsLoading(true)
		setError(undefined)

		try {
			await requestPasswordReset({ email })
			restart()
		} catch {
			setError('Не удалось отправить письмо. Попробуйте ещё раз')
		} finally {
			setIsLoading(false)
		}
	}

	return { secondsLeft, isFinished, isLoading, error, resend }
}
