import { Logo } from '@shared/ui/logo'
import styles from './styles.module.css'
import type { THeaderProps } from './types'

export const Header: React.FC<THeaderProps> = ({ children }) => (
	<header className={styles.header}>
		<div className={styles.brand}>
			<Logo />
			<span className={styles.brandTitle}>Тренажер памяти</span>
		</div>
		<div>{children}</div>
	</header>
)
