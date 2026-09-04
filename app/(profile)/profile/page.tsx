// app/profile/page.tsx
'use client'

import type { TProfileTab } from '@widgets/profile-tabs'
import { ProfileTabs } from '@widgets/profile-tabs'
import { useState } from 'react'

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<TProfileTab>('profile')

	return (
		<div>
			<ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

			{/* Контент вкладок */}
			<div style={{ padding: '24px 0' }}>
				{activeTab === 'profile' && <div>Информация профиля</div>}
				{activeTab === 'progress' && <div>Прогресс тренировок</div>}
				{activeTab === 'settings' && <div>Настройки</div>}
			</div>
		</div>
	)
}
