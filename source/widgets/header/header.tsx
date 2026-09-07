'use client'

import { DesktopMenu, MobileMenu } from '@features/menu'
import { getMobileMenuItems } from '@features/menu/menu-config'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Avatar } from '@shared/ui/avatar'
import { Button } from '@shared/ui/button'
import { Logo } from '@shared/ui/logo'
import { ProfileInfo } from '@shared/ui/profile-info'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './styles.module.css'
import type { THeaderProps } from './types'

// ==========================================
// ВРЕМЕННЫЕ ТИПЫ И ХУК (STUB)
// TODO: Заменить на реальный хук авторизации (например, next-auth,
// кастомный Context или Zustand) перед релизом.
// ==========================================
type TUser = { name: string; avatarUrl: string }

type TAuthState = {
	user: TUser | null
	isLoggedIn: boolean
	logout: () => void
	/** Только для локальной разработки: переключение состояния */
	toggleAuth: () => void
}

export const useAuth = (): TAuthState => {
	const [isLoggedIn, setIsLoggedIn] = useState(true)
	const user: TUser = { name: 'Иван Петрович', avatarUrl: '/images/promo.jpg' }

	return {
		user: isLoggedIn ? user : null,
		isLoggedIn,
		logout: () => {
			setIsLoggedIn(false)
			console.log('[stub] logout called')
		},
		toggleAuth: () => setIsLoggedIn((prev) => !prev),
	}
}

export const Header: React.FC<THeaderProps> = ({ children }) => {
	const router = useRouter()
	const { user, isLoggedIn, logout, toggleAuth } = useAuth()

	const handleLogout = () => {
		logout()
		router.push(createUrl(routerPath.auth))
	}

	const desktopProfileSlot = user ? (
		<ProfileInfo name={user.name} avatarUrl={user.avatarUrl} size="md" />
	) : undefined

	const mobileProfileSlot = (
		<Avatar
			name={user ? user.name : 'Гость'}
			avatarUrl={user ? user.avatarUrl : ''}
			size="sm"
		/>
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

	// TODO: При реализации системы уведомлений заменить undefined на слот
	const notificationsSlot = undefined

	const currentMobileMenuItems = getMobileMenuItems(isLoggedIn)

	return (
		<header className={styles.header}>
			<div className={styles.brand}>
				<Logo />
				<span className={styles.brandTitle}>Тренажер памяти</span>
			</div>

			{process.env.NODE_ENV === 'development' && (
				<button
					type="button"
					className={styles.devToggle}
					onClick={toggleAuth}
					title="Переключить состояние авторизации (DEV)"
				>
					[DEV] {isLoggedIn ? 'Стать гостем' : 'Стать юзером'}
				</button>
			)}

			<div className={styles.menus}>
				<DesktopMenu
					className={styles.desktopOnly}
					accountSlot={desktopProfileSlot}
					authSlot={desktopAuthSlot}
					profileSlot={
						<Avatar
							avatarUrl={user?.avatarUrl || ''}
							name={user?.name || ''}
							size="sm"
						/>
					}
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
