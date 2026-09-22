'use client'

import { Button } from '@shared/ui/button'
import { FormError } from '@shared/ui/form-error/form-error'
import { TextInput } from '@shared/ui/text-input'
import styles from './styles.module.css'
import type { TConfirmEmailFormProps } from './types'

export const ConfirmEmailForm: React.FC<TConfirmEmailFormProps> = ({
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

			<TextInput
				label="Код из письма"
				inputMode="numeric"
				autoComplete="one-time-code"
				placeholder="123456"
				error={Boolean(errors.code)}
				{...register('code')}
			/>

			<FormError message={formError} />

			<Button
				type="submit"
				size="lg"
				disabled={isLoading}
				className={styles.submit}
			>
				Подтвердить
			</Button>
		</form>
	)
}
