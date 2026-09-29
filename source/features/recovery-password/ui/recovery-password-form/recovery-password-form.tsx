'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { FormError } from '@shared/ui/form-error'
import { PasswordInput } from '@shared/ui/password-input'
import Link from 'next/link'
import styles from './styles.module.css'
import type { TRecoveryPasswordFormProps } from './types'

export const RecoveryPasswordForm: React.FC<TRecoveryPasswordFormProps> = ({
	register,
	errors,
	onSubmit,
	formError,
	isLoading,
}) => {
	return (
		<form className={styles.form} noValidate onSubmit={onSubmit}>
			<PasswordInput
				label="Новый пароль"
				placeholder="Введите пароль"
				autoComplete="new-password"
				error={Boolean(errors.password)}
				{...register('password')}
			/>

			<PasswordInput
				label="Повторите пароль"
				placeholder="Повторите пароль"
				autoComplete="new-password"
				error={Boolean(errors.repeatPassword)}
				{...register('repeatPassword')}
			/>

			<FormError message={formError} />

			<Button
				type="submit"
				size="lg"
				disabled={isLoading}
				className={styles.submit}
			>
				Сохранить пароль
			</Button>

			<p className={styles.retryHint}>
				<Link href={createUrl(routerPath.forgotPassword)}>
					Запросить код заново
				</Link>
			</p>
		</form>
	)
}
