import { Logo } from '@shared/ui/logo'
import styles from './styles.module.css'
import type { TFooterProps } from './types'

export const Footer: React.FC<TFooterProps> = ({ children }) => {
	const currentYear = new Date().getFullYear()
	const email =
		process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'inclusion@yandex-team.ru'

	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<Logo />
				<p className={styles.contact}>
					Вопросы и предложения на{' '}
					<a href={`mailto:${email}`} className={styles.contactEmail}>
						{email}
					</a>
				</p>
				<span className={styles.copyright}>
					&copy; 1997 — {currentYear} ООО «Яндекс»
				</span>
				{children && <div>{children}</div>}
			</div>
		</footer>
	)
}
