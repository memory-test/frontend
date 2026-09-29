'use client'

import { useForgotPasswordForm } from '@features/forgot-password'
import { ForgotPasswordPage } from '@pages/forgot-password-page'
import { useState } from 'react'

const ForgotPasswordRoute: React.FC = () => {
	const [sentEmail, setSentEmail] = useState<string | null>(null)

	const { register, errors, onSubmit, formError, isLoading } =
		useForgotPasswordForm({
			onSuccess: setSentEmail,
		})

	if (sentEmail) {
		return <ForgotPasswordPage step="sent" email={sentEmail} />
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
