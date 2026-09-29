import type { TForgotPasswordFormProps } from '@features/forgot-password'
import {
	ForgotPasswordForm,
	ForgotPasswordSent,
} from '@features/forgot-password'
import { AuthCard } from '@shared/ui/auth-card'

export type TForgotPasswordPageProps =
	| ({ step: 'form' } & TForgotPasswordFormProps)
	| { step: 'sent'; email: string }

export const ForgotPasswordPage: React.FC<TForgotPasswordPageProps> = (
	props,
) => {
	if (props.step === 'sent') {
		return (
			<AuthCard
				compactHeight={522}
				title="Проверьте почту"
				subtitle="Мы отправили письмо для восстановления пароля"
			>
				<ForgotPasswordSent email={props.email} />
			</AuthCard>
		)
	}

	const { step: _step, ...formProps } = props

	return (
		<AuthCard
			compactHeight={522}
			title="Восстановление пароля"
			subtitle="Введите электронную почту, которую использовали при регистрации"
		>
			<ForgotPasswordForm {...formProps} />
		</AuthCard>
	)
}
