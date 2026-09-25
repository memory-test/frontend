import type { TRegisterFormProps } from '@features/register'
import { RegisterForm } from '@features/register'
import { AuthCard } from '@shared/ui/auth-card'

export const RegisterPage: React.FC<TRegisterFormProps> = (props) => (
	<AuthCard
		title="Добро пожаловать"
		subtitle="Создайте аккаунт, чтобы начать тренировки памяти"
	>
		<RegisterForm {...props} />
	</AuthCard>
)
