export type TProfileTab = 'profile' | 'progress' | 'settings'

export interface IProfileTabsProps {
	/** Активная вкладка */
	activeTab: TProfileTab
	/** Обработчик изменения вкладки */
	onTabChange?: (tab: TProfileTab) => void
	/** Дополнительный CSS-класс */
	className?: string
}

export type TProfileTabsProps = IProfileTabsProps
