'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { FormError } from '@shared/ui/form-error'
import { TextInput } from '@shared/ui/text-input'
import Link from 'next/link'
import { useEnterCodeForm } from '../../model/use-enter-code-form'
import { useResendPasswordReset } from '../../model/use-resend-password-reset'
import styles from './styles.module.css'

interface IForgotPasswordSentProps {
	email: string
}

export const ForgotPasswordSent: React.FC<IForgotPasswordSentProps> = ({
	email,
}) => {
	const { register, onSubmit, errors } = useEnterCodeForm({ email })
	const { secondsLeft, isFinished, isLoading, error, resend } =
		useResendPasswordReset({ email })

	const minutes = Math.floor(secondsLeft / 60)
	const seconds = String(secondsLeft % 60).padStart(2, '0')

	return (
		<form className={styles.wrapper} noValidate onSubmit={onSubmit}>
			<TextInput
				label="Код из письма"
				inputMode="numeric"
				autoComplete="one-time-code"
				placeholder="123456"
				error={Boolean(errors.code)}
				errorMessage={errors.code?.message}
				{...register('code')}
			/>

			<Button type="submit" size="lg" className={styles.actionButton}>
				Продолжить
			</Button>

			{isFinished ? (
				<Button
					type="button"
					variant="outline"
					size="lg"
					disabled={isLoading}
					className={styles.actionButton}
					onClick={resend}
				>
					Отправить еще раз
				</Button>
			) : (
				<p className={styles.resendHint}>
					Повторная отправка возможна через {minutes}:{seconds}
				</p>
			)}

			<FormError message={error} />

			<p className={styles.backHint}>
				<Link href={createUrl(routerPath.auth)}>Вернуться ко входу</Link>
			</p>
		</form>
	)
}
