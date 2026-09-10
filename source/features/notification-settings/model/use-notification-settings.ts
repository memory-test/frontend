import { useCallback, useState } from 'react'
import type { TNotificationSettings } from './types'

// TODO(#44): подключить бэкенд, когда появится эндпоинт.
// Ожидаемый контракт (согласовать с бэкендерами):
//   GET   /api/v1/notification-settings/   → TNotificationSettings
//   PATCH /api/v1/notification-settings/   → TNotificationSettings
export const useNotificationSettings = () => {
	const [settings, setSettings] = useState<TNotificationSettings>({
		browser: false,
		email: false,
	})

	const toggleSetting = useCallback((key: keyof TNotificationSettings) => {
		setSettings((prev) => {
			const next = { ...prev, [key]: !prev[key] }

			// TODO(#44): сохранить на бэкенд (нужен эндпоинт)
			// await updateNotificationSettings({ [key]: next[key] })

			return next
		})
	}, [])

	return { settings, toggleSetting }
}
