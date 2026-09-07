import { createUrl, routerPath } from '@shared/lib/routes'
import {
	FolderIcon,
	HomeIcon,
	LogInIcon,
	LogOutIcon,
	UserIcon,
	UserPlusIcon,
} from 'lucide-react'
import type { TMenuConfigItem } from './types'
import { MENU_ITEM_IDS } from './types'

// ==========================================
// МОБИЛЬНОЕ МЕНЮ (Один список, меняющийся от статуса)
// ==========================================
export const getMobileMenuItems = (isLoggedIn: boolean): TMenuConfigItem[] => {
	const baseItems: TMenuConfigItem[] = [
		{
			id: MENU_ITEM_IDS.home,
			label: 'Главная',
			href: createUrl(routerPath.home),
			icon: HomeIcon,
		},
		{
			id: MENU_ITEM_IDS.catalog,
			label: 'Каталог заданий',
			href: createUrl(routerPath.catalog),
			icon: FolderIcon,
		},
	]

	if (isLoggedIn) {
		return [
			...baseItems,
			{
				id: MENU_ITEM_IDS.profile,
				label: 'Профиль',
				href: createUrl(routerPath.profile),
				icon: UserIcon,
			},
			{
				id: MENU_ITEM_IDS.logout,
				label: 'Выйти',
				action: 'logout',
				icon: LogOutIcon,
			},
		]
	}

	return [
		...baseItems,
		{
			id: MENU_ITEM_IDS.login,
			label: 'Войти',
			href: createUrl(routerPath.auth),
			icon: LogInIcon,
		},
		{
			id: MENU_ITEM_IDS.register,
			label: 'Зарегистрироваться',
			href: createUrl(routerPath.register),
			icon: UserPlusIcon,
		},
	]
}

// ==========================================
// ДЕСКТОПНОЕ МЕНЮ (Разные визуальные блоки через слоты в Header)
// ==========================================

// Эти пункты видны всегда (и гостю, и юзеру)
export const desktopNavItems: TMenuConfigItem[] = [
	{
		id: MENU_ITEM_IDS.home,
		label: 'Главная',
		href: createUrl(routerPath.home),
		icon: HomeIcon,
	},
	{
		id: MENU_ITEM_IDS.catalog,
		label: 'Каталог заданий',
		href: createUrl(routerPath.catalog),
		icon: FolderIcon,
	},
]

// Эти пункты рендерятся ТОЛЬКО если Header передал accountSlot (т.е. пользователь залогинен).
// Для гостя Header передаст authSlot (кнопки), и этот массив будет проигнорирован.
export const desktopAccountItems: TMenuConfigItem[] = [
	{
		id: MENU_ITEM_IDS.profile,
		label: 'Профиль',
		href: createUrl(routerPath.profile),
		icon: UserIcon,
	},
	{
		id: MENU_ITEM_IDS.logout,
		label: 'Выйти',
		action: 'logout',
		icon: LogOutIcon,
	},
]
