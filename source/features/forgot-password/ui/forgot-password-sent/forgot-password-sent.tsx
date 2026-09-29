import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import Link from 'next/link'
import styles from './styles.module.css'

interface IForgotPasswordSentProps {
	email: string
}

export const ForgotPasswordSent: React.FC<IForgotPasswordSentProps> = ({
	email,
}) => {
	return (
		<div className={styles.wrapper}>
			<Button
				type="button"
				variant="outline"
				size="lg"
				className={styles.actionButton}
			>
				Отправить еще раз
			</Button>

			<Button
				href={createUrl(routerPath.recoveryPassword, undefined, { email })}
				size="lg"
				className={styles.actionButton}
			>
				Ввести код
			</Button>

			<p className={styles.backHint}>
				<Link href={createUrl(routerPath.auth)}>Вернуться ко входу</Link>
			</p>
		</div>
	)
}
