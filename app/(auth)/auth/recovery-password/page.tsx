'use client'

import { useRecoveryPasswordForm } from '@features/recovery-password'
import { RecoveryPasswordPage } from '@pages/recovery-password-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const RecoveryPasswordContent: React.FC = () => {
	const router = useRouter()
	const { register, errors, onSubmit, formError, isLoading } =
		useRecoveryPasswordForm({
			onSuccess: () => router.push(createUrl(routerPath.auth)),
		})

	return (
		<RecoveryPasswordPage
			register={register}
			errors={errors}
			onSubmit={onSubmit}
			formError={formError}
			isLoading={isLoading}
		/>
	)
}

const RecoveryPasswordRoute: React.FC = () => (
	<Suspense fallback={null}>
		<RecoveryPasswordContent />
	</Suspense>
)

export default RecoveryPasswordRoute
