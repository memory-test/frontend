'use client'

import { useLoginForm } from '@features/login'
import { LoginPage } from '@pages/login-page'

const AuthPage: React.FC = () => {
	const { register, onSubmit, formError, isLoading } = useLoginForm()

	return (
		<LoginPage
			register={register}
			onSubmit={onSubmit}
			formError={formError}
			isLoading={isLoading}
		/>
	)
}

export default AuthPage
