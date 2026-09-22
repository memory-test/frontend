'use client'

import { useConfirmEmailForm } from '@features/confirm-email'
import { ConfirmEmailPage } from '@pages/confirm-email-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const ConfirmEmailForm: React.FC = () => {
	const router = useRouter()
	const { register, errors, onSubmit, formError, isLoading } =
		useConfirmEmailForm({
			onSuccess: () => router.push(createUrl(routerPath.home)),
		})

	return (
		<ConfirmEmailPage
			register={register}
			errors={errors}
			onSubmit={onSubmit}
			formError={formError}
			isLoading={isLoading}
		/>
	)
}

const ConfirmEmailRoute: React.FC = () => (
	<Suspense fallback={null}>
		<ConfirmEmailForm />
	</Suspense>
)

export default ConfirmEmailRoute
