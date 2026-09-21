'use client'

import { useRegisterForm } from '@features/register'
import { RegisterPage } from '@pages/register-page'

const RegisterRoute: React.FC = () => {
	const { register, errors, onSubmit, formError, isLoading } = useRegisterForm()

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
