'use client'

import { Switch } from '@shared/ui/switch'
import { useNotificationSettings } from '../model/use-notification-settings'
import styles from './styles.module.css'

export const NotificationSettings: React.FC = () => {
	const { settings, toggleSetting } = useNotificationSettings()

	return (
		<section
			className={styles.card}
			aria-labelledby="notification-settings-title"
		>
			<h3 id="notification-settings-title" className={styles.title}>
				Настройки уведомлений
			</h3>

			<div className={styles.switches}>
				<label className={styles.row} htmlFor="browser-notifications">
					<span className={styles.label}>Уведомления в браузере</span>
					<Switch
						id="browser-notifications"
						checked={settings.browser}
						onCheckedChange={() => toggleSetting('browser')}
					/>
				</label>

				<label className={styles.row} htmlFor="email-notifications">
					<span className={styles.label}>Уведомления на электронную почту</span>
					<Switch
						id="email-notifications"
						checked={settings.email}
						onCheckedChange={() => toggleSetting('email')}
					/>
				</label>
			</div>
		</section>
	)
}
