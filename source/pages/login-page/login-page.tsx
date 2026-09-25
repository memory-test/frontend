import type { TLoginFormProps } from '@features/login'
import { LoginForm } from '@features/login'
import { AuthCard } from '@shared/ui/auth-card'

export const LoginPage: React.FC<TLoginFormProps> = (props) => (
	<AuthCard
		title="Добро пожаловать"
		subtitle="Войдите в аккаунт, чтобы продолжить занятия"
	>
		<LoginForm {...props} />
	</AuthCard>
)
