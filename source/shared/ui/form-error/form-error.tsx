import styles from './styles.module.css'
import type { TFormErrorProps } from './types'

export const FormError: React.FC<TFormErrorProps> = ({ message }) => (
	<p className={styles.formError} role="alert">
		{message}
	</p>
)
