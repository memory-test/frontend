import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export const MENU_ITEM_IDS = {
	home: 'home',
	profile: 'profile',
	catalog: 'catalog',
	logout: 'logout',
	login: 'login',
	register: 'register',
} as const

export type TMenuItemId = (typeof MENU_ITEM_IDS)[keyof typeof MENU_ITEM_IDS]

export type TMenuConfigItem = {
	id: TMenuItemId
	label: string
	icon: LucideIcon
	href?: string
	action?: 'logout'
}

export type TMobileMenuProps = {
	profileSlot: ReactNode // <-- Один слот: либо Юзер, либо "Гость"
	notificationsSlot?: ReactNode
	onLogout?: () => void
	className?: string
	menuItems: TMenuConfigItem[] // <-- Массив пунктов меню для отрисовки
}

export type TDesktopMenuProps = {
	accountSlot?: ReactNode // для залогиненного (ProfileInfo)
	authSlot?: ReactNode // для неавторизованного (кнопки Войти/Регистрация)
	profileSlot?: ReactNode // маленький аватар внутри дропдауна
	notificationsSlot?: ReactNode
	onLogout?: () => void
	className?: string
}
