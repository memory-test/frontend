'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { FormError } from '@shared/ui/form-error'
import { TextInput } from '@shared/ui/text-input'
import Link from 'next/link'
import styles from './styles.module.css'
import type { TForgotPasswordFormProps } from './types'

export const ForgotPasswordForm: React.FC<TForgotPasswordFormProps> = ({
	register,
	errors,
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
				error={Boolean(errors.email)}
				{...register('email')}
			/>

			<FormError message={formError} />

			<Button
				type="submit"
				size="lg"
				disabled={isLoading}
				className={styles.submit}
			>
				Отправить код
			</Button>

			<p className={styles.backHint}>
				<Link href={createUrl(routerPath.auth)}>Вернуться ко входу</Link>
			</p>
		</form>
	)
}
