'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import type { TLinkItem } from '@shared/ui/link-group'
import { LinkGroup } from '@shared/ui/link-group'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'

const linkItems: TLinkItem[] = [
	{
		label: 'Профиль',
		href: createUrl(routerPath.profile),
	},
	{
		label: 'Настройки',
		href: createUrl(routerPath.settings),
	},
	{
		label: 'Прогресс',
		href: createUrl(routerPath.progress),
	},
]

const isRouteActive = (pathname: string, href: string) =>
	pathname === href || pathname.startsWith(`${href}/`)

export const ProfileNavigation = () => {
	const pathname = usePathname()

	const activeLink = linkItems.find((link) =>
		isRouteActive(pathname, link.href),
	)?.href

	return (
		<LinkGroup
			items={linkItems}
			ariaLabel="Разделы профиля"
			activeLink={activeLink}
			className={styles.linkGroup}
		/>
	)
}
