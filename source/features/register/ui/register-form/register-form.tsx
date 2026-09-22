'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { AuthSocialButtons } from '@shared/ui/auth-social-buttons'
import { Button } from '@shared/ui/button'
import { FormError } from '@shared/ui/form-error'

import { PasswordInput } from '@shared/ui/password-input'
import { TextInput } from '@shared/ui/text-input'
import Link from 'next/link'
import styles from './styles.module.css'
import type { TRegisterFormProps } from './types'

export const RegisterForm: React.FC<TRegisterFormProps> = ({
	register,
	errors,
	onSubmit,
	formError,
	isLoading,
}) => {
	return (
		<form className={styles.form} noValidate onSubmit={onSubmit}>
			<TextInput
				label="Имя"
				placeholder="Введите ваше имя"
				autoComplete="name"
				error={Boolean(errors.name)}
				{...register('name')}
			/>

			<TextInput
				label="Электронная почта"
				type="email"
				placeholder="example@mail.ru"
				autoComplete="email"
				error={Boolean(errors.email)}
				{...register('email')}
			/>

			<PasswordInput
				label="Пароль"
				placeholder="Введите пароль"
				autoComplete="new-password"
				error={Boolean(errors.password)}
				{...register('password')}
			/>

			<FormError message={formError} />

			<Button
				type="submit"
				size="lg"
				disabled={isLoading}
				className={styles.submit}
			>
				Зарегистрироваться
			</Button>

			<AuthSocialButtons />

			<p className={styles.loginHint}>
				Уже есть аккаунт? <Link href={createUrl(routerPath.auth)}>Войти</Link>
			</p>
		</form>
	)
}
