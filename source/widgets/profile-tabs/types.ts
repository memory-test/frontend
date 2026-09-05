import type { ReactNode } from 'react'

export type TProfileTab = 'profile' | 'progress' | 'settings'

export type TTabItem = {
	value: TProfileTab
	label: string
	content: ReactNode
}

export type TProfileTabsProps = {
	activeTab: TProfileTab
	onTabChange?: (tab: TProfileTab) => void
	tabs: TTabItem[]
	className?: string
}
