'use client'

import { logout, useSessionStore } from '@entities/session'
import { DesktopMenu, MobileMenu } from '@features/menu'
import { getMobileMenuItems } from '@features/menu/menu-config'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import { Logo } from '@shared/ui/logo'
import { ProfileInfo } from '@shared/ui/profile-info'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import type { THeaderProps } from './types'

export const useScrollHeader = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return isScrolled
}

export const Header: React.FC<THeaderProps> = () => {
	const router = useRouter()

	// <-- 1. ДОБАВЛЕНО: user, и isInitializing
	const user = useSessionStore((state) => state.user)
	const isInitializing = useSessionStore((state) => state.isInitializing)

	const isScrolled = useScrollHeader()

	const handleLogout = () => {
		logout()
		router.push(createUrl(routerPath.auth))
	}

	// <-- 2. ДОБАВЛЕНО: Пока идет инициализация, показываем "скелетон" хедера
	// Это предотвращает мигание (layout shift), так как высота сохраняется
	if (isInitializing) {
		return (
			<header className={clsx(styles.header, isScrolled && styles.scrolled)}>
				<div className={styles.brand}>
					<Logo />
					<span className={styles.brandTitle}>Тренажер памяти</span>
				</div>
				<div className={styles.menus}>
					{/* Пустой блок той же высоты, что и кнопки/аватар, чтобы не было скачка */}
					<div className={styles.skeletonPlaceholder} />
				</div>
			</header>
		)
	}

	// <-- 3. Основной рендер (выполняется только когда isInitializing === false)
	const isLoggedIn = Boolean(user)

	const desktopProfileSlot = user ? (
		<ProfileInfo name={user.name} size="md" />
	) : undefined

	const mobileProfileSlot = (
		<Avatar name={user ? user.name : 'Гость'} size="sm" />
	)

	const desktopAuthSlot = !isLoggedIn ? (
		<div className={styles.authButtons}>
			<Button variant="outline" size="sm" href={createUrl(routerPath.auth)}>
				Войти
			</Button>
			<Button variant="default" size="sm" href={createUrl(routerPath.register)}>
				Регистрация
			</Button>
		</div>
	) : undefined

	const notificationsSlot = undefined
	const currentMobileMenuItems = getMobileMenuItems(isLoggedIn)

	return (
		<header className={clsx(styles.header, isScrolled && styles.scrolled)}>
			<div className={styles.brand}>
				<Logo />
				<span className={styles.brandTitle}>Тренажер памяти</span>
			</div>

			<div className={styles.menus}>
				<DesktopMenu
					className={styles.desktopOnly}
					accountSlot={desktopProfileSlot}
					authSlot={desktopAuthSlot}
					profileSlot={<Avatar name={user?.name || ''} size="sm" />}
					notificationsSlot={notificationsSlot}
					onLogout={handleLogout}
				/>
				<MobileMenu
					className={styles.mobileOnly}
					profileSlot={mobileProfileSlot}
					notificationsSlot={notificationsSlot}
					onLogout={handleLogout}
					menuItems={currentMobileMenuItems}
				/>
			</div>
		</header>
	)
}
