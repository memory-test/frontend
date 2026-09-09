import type { TLoginFormProps } from '@features/login'
import { LoginForm } from '@features/login'
import { Surface } from '@shared/ui/surface'
import styles from './styles.module.css'

export const LoginPage: React.FC<TLoginFormProps> = (props) => (
	<main className={styles.main}>
		<Surface className={styles.card}>
			<h1 className={styles.title}>Добро пожаловать</h1>
			<p className={styles.subtitle}>
				Войдите в аккаунт, чтобы продолжить занятия
			</p>
			<LoginForm {...props} />
		</Surface>
	</main>
)
