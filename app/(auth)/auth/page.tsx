'use client'

import { useLoginForm } from '@features/login'
import { LoginPage } from '@pages/login-page'
import { useRouter } from 'next/navigation'

const AuthPage: React.FC = () => {
	const router = useRouter()
	const { register, onSubmit, formError, isLoading } = useLoginForm({
		onSuccess: () => router.push('/'),
	})

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
