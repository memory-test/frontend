'use client'

import { useCountdown } from '@shared/lib/use-countdown'
import { useState } from 'react'
import { requestPasswordReset } from '../api/forgot-password'
import {
	RESEND_CODE_TIMEOUT_SECONDS,
	SEND_CODE_ERROR_MESSAGE,
} from './constants'

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
			setError(SEND_CODE_ERROR_MESSAGE)
		} finally {
			setIsLoading(false)
		}
	}

	return { secondsLeft, isFinished, isLoading, error, resend }
}
