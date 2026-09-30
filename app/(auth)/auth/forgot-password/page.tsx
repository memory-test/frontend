'use client'

import { useForgotPasswordForm } from '@features/forgot-password'
import { ForgotPasswordPage } from '@pages/forgot-password-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ForgotPasswordRoute: React.FC = () => {
	const router = useRouter()
	const [sentEmail, setSentEmail] = useState<string | null>(null)

	const { register, errors, onSubmit, formError, isLoading } =
		useForgotPasswordForm({
			onSuccess: setSentEmail,
		})

	if (sentEmail) {
		return (
			<ForgotPasswordPage
				step="sent"
				email={sentEmail}
				onCodeSubmit={(code) =>
					router.push(
						createUrl(routerPath.recoveryPassword, undefined, {
							email: sentEmail,
							code,
						}),
					)
				}
			/>
		)
	}

	return (
		<ForgotPasswordPage
			step="form"
			register={register}
			errors={errors}
			onSubmit={onSubmit}
			formError={formError}
			isLoading={isLoading}
		/>
	)
}

export default ForgotPasswordRoute
