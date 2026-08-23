import { Logo } from '@shared/ui/logo'
import styles from './styles.module.css'
import type { TFooterProps } from './types'

export const Footer: React.FC<TFooterProps> = ({ children }) => {
	const currentYear = new Date().getFullYear()
	const email =
		process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'inclusion@yandex-team.ru'

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.brand}>
						<Logo />
					</div>

					<div className={styles.contact}>
						<span className={styles.contactLabel}>
							<span className={styles.contactText}>
								Вопросы и предложения
								<span className={styles.contactTextDesktop}> на </span>
							</span>
							<span className={styles.contactTextMobile}>
								<br />
								на{' '}
							</span>
							<a href={`mailto:${email}`} className={styles.contactEmail}>
								{email}
							</a>
						</span>
					</div>

					{children && <div className={styles.children}>{children}</div>}
				</div>

				<div className={styles.copyright}>
					<span>&copy; 1997 — {currentYear} ООО «Яндекс»</span>
				</div>
			</div>
		</footer>
	)
}
