import type { TConfirmEmailFormProps } from '@features/confirm-email'
import { ConfirmEmailForm } from '@features/confirm-email'
import { AuthCard } from '@shared/ui/auth-card'

export const ConfirmEmailPage: React.FC<TConfirmEmailFormProps> = (props) => (
	<AuthCard
		title="Подтвердите почту"
		subtitle="Введите код, который мы отправили вам на почту"
	>
		<ConfirmEmailForm {...props} />
	</AuthCard>
)
