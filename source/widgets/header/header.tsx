import { Logo } from '@shared/ui/logo'
import type { THeaderProps } from '.'
import styles from './styles.module.css'

export const Header: React.FC<THeaderProps> = ({ children }) => (
	<header className={styles.header}>
		<div className={styles.brand}>
			<Logo />
			<span className={styles.brandTitle}>Тренажер памяти</span>
		</div>
		<div>{children}</div>
	</header>
)
