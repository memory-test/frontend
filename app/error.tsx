'use client'

import { ErrorState } from '@shared/ui/error-state'

type TErrorPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function ErrorPage({ error, reset }: TErrorPageProps) {
	console.error('Ошибка:', error)
	return (
		<ErrorState
			title="Что-то пошло не так"
			description="Попробуйте обновить страницу или зайти чуть позже"
			onRetry={reset}
		/>
	)
}
