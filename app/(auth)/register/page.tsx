'use client'

import { useRegisterForm } from '@features/register'
import { RegisterPage } from '@pages/register-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'

const RegisterRoute: React.FC = () => {
	const router = useRouter()
	const { register, errors, onSubmit, formError, isLoading } = useRegisterForm({
		onSuccess: (email) => {
			const params = new URLSearchParams({ email })
			router.push(`${createUrl(routerPath.confirmEmail)}?${params.toString()}`)
		},
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
