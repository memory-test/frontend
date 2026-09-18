'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { PasswordInput } from '@shared/ui/password-input'
import { TextInput } from '@shared/ui/text-input'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import type { TLoginFormProps } from './types'

export const LoginForm: React.FC<TLoginFormProps> = ({
	register,
	onSubmit,
	formError,
	isLoading,
}) => {
	return (
		<form className={styles.form} noValidate onSubmit={onSubmit}>
			<TextInput
				label="Электронная почта"
				type="email"
				placeholder="example@mail.ru"
				autoComplete="email"
				error={Boolean(formError)}
				{...register('email')}
			/>

			<div className={styles.passwordGroup}>
				<PasswordInput
					label="Пароль"
					placeholder="Введите пароль"
					autoComplete="current-password"
					error={Boolean(formError)}
					{...register('password')}
				/>

				<Link
					href={createUrl(routerPath.forgotPassword)}
					className={styles.forgotLink}
				>
					Забыли пароль?
				</Link>
			</div>

			<p className={styles.formError} role="alert">
				{formError}
			</p>

			<Button
				type="submit"
				size="lg"
				disabled={isLoading}
				className={styles.submit}
			>
				Войти
			</Button>

			<span className={styles.divider}>или</span>

			<Button
				type="button"
				variant="outline"
				size="lg"
				icon={<Image src="/logo-yandex.svg" alt="" width={24} height={24} />}
			>
				Войти через Яндекс
			</Button>
			<Button
				type="button"
				variant="outline"
				size="lg"
				icon={<Image src="/logo-ok.svg" alt="" width={24} height={24} />}
			>
				Войти через Одноклассники
			</Button>

			<p className={styles.registerHint}>
				Нет аккаунта?{' '}
				<Link href={createUrl(routerPath.register)}>Зарегистрироваться</Link>
			</p>
		</form>
	)
}
