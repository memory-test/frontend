import type { TLoginFormProps } from '@features/login'
import { LoginForm } from '@features/login'
import styles from './styles.module.css'

export const LoginPage: React.FC<TLoginFormProps> = (props) => (
	<main className={styles.main}>
		<div className={styles.card}>
			<div className={styles.intro}>
				<h1 className={styles.title}>Добро пожаловать</h1>
				<p className={styles.subtitle}>
					Войдите в аккаунт, чтобы продолжить занятия
				</p>
			</div>
			<LoginForm {...props} />
		</div>
	</main>
)
