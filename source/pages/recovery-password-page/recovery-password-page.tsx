import type { TRecoveryPasswordFormProps } from '@features/recovery-password'
import { RecoveryPasswordForm } from '@features/recovery-password'
import { AuthCard } from '@shared/ui/auth-card'

export const RecoveryPasswordPage: React.FC<TRecoveryPasswordFormProps> = (
	props,
) => (
	<AuthCard
		compactHeight={484}
		title="Новый пароль"
		subtitle="Придумайте новый пароль для входа"
	>
		<RecoveryPasswordForm {...props} />
	</AuthCard>
)
