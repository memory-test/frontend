'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { TextInput } from '@shared/ui/text-input'
import Link from 'next/link'
import { useEnterCodeForm } from '../../model/use-enter-code-form'
import styles from './styles.module.css'

interface IForgotPasswordSentProps {
	email: string
}

export const ForgotPasswordSent: React.FC<IForgotPasswordSentProps> = ({
	email,
}) => {
	const { register, onSubmit, errors } = useEnterCodeForm({ email })

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

			<Button
				type="button"
				variant="outline"
				size="lg"
				className={styles.actionButton}
			>
				Отправить еще раз
			</Button>

			<p className={styles.backHint}>
				<Link href={createUrl(routerPath.auth)}>Вернуться ко входу</Link>
			</p>
		</form>
	)
}
