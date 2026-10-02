'use client'

import { useSessionStore } from '@entities/session'
import { DashboardPage } from '@pages/dashboard-page'
import { MainPage } from '@pages/main-page'
import { PageSkeleton } from '@shared/ui/page-skeleton'

const HomePage: React.FC = () => {
	const user = useSessionStore((state) => state.user)
	const isInitializing = useSessionStore((state) => state.isInitializing)

	if (isInitializing) {
		return <PageSkeleton />
	}

	if (!user) {
		return <MainPage />
	}

	return <DashboardPage />
}

export default HomePage
