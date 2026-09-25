'use client'

import { useRegisterForm } from '@features/register'
import { RegisterPage } from '@pages/register-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'

const RegisterRoute: React.FC = () => {
	const router = useRouter()
	const { register, errors, onSubmit, formError, isLoading } = useRegisterForm({
		onSuccess: (email) =>
			router.push(createUrl(routerPath.confirmEmail, undefined, { email })),
	})

	return (
		<RegisterPage
			register={register}
			errors={errors}
			onSubmit={onSubmit}
			formError={formError}
			isLoading={isLoading}
		/>
	)
}

export default RegisterRoute
