'use client'

import clsx from 'clsx'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { TMobileMenuProps } from '../types'
import { MENU_ITEM_IDS } from '../types'
import styles from './mobile-menu.module.css'

export const MobileMenu: React.FC<TMobileMenuProps> = ({
	profileSlot,
	notificationsSlot,
	onLogout,
	className,
	menuItems,
}) => {
	const [open, setOpen] = useState(false)
	const burgerRef = useRef<HTMLButtonElement>(null)
	const drawerRef = useRef<HTMLElement>(null)

	// Эффект 1: фокус-трап + scroll-lock + Escape
	useEffect(() => {
		if (!open) return
		const drawer = drawerRef.current
		if (drawer) {
			const firstFocusable = drawer.querySelector<HTMLElement>(
				'a, button, [tabindex]:not([tabindex="-1"])',
			)
			firstFocusable?.focus()
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false)
				return
			}
			if (e.key !== 'Tab' || !drawer) return
			const focusableElements = drawer.querySelectorAll<HTMLElement>(
				'a, button, [tabindex]:not([tabindex="-1"])',
			)
			if (focusableElements.length === 0) return
			const first = focusableElements[0]
			const last = focusableElements[focusableElements.length - 1]
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [open])

	// Эффект 2: возврат фокуса на burger при закрытии
	useEffect(() => {
		if (!open && burgerRef.current) burgerRef.current.focus()
	}, [open])

	// Эффект 3: закрытие при переходе на десктоп
	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1440px)')
		const onChange = (e: MediaQueryListEvent) => {
			if (e.matches) setOpen(false)
		}
		mq.addEventListener('change', onChange)
		return () => mq.removeEventListener('change', onChange)
	}, [])

	const closeMenu = () => setOpen(false)

	// Проверяем, есть ли пункт 'profile' в массиве меню
	const isProfileInMenu = menuItems.some(
		(item) => item.id === MENU_ITEM_IDS.profile,
	)
	const statusLabel = isProfileInMenu ? 'Профиль' : 'Гость'

	return (
		<>
			<div className={clsx(styles.controls, className)}>
				{notificationsSlot}
				<button
					ref={burgerRef}
					type="button"
					className={styles.burger}
					aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
					aria-expanded={open}
					aria-controls="mobile-menu"
					onClick={() => setOpen((v) => !v)}
				>
					<span aria-hidden="true">{open ? <XIcon /> : <MenuIcon />}</span>
				</button>
			</div>

			{open && (
				<div className={styles.overlayWrapper}>
					<button
						type="button"
						className={styles.backdrop}
						aria-label="Закрыть меню"
						tabIndex={-1}
						onClick={closeMenu}
					/>
					<nav
						ref={drawerRef}
						id="mobile-menu"
						className={styles.drawer}
						role="dialog"
						aria-modal="true"
						aria-label="Меню"
					>
						{/* Показываем статус ТОЛЬКО для гостя */}
						{!isProfileInMenu && (
							<div className={styles.profileStatus}>
								{profileSlot}
								<span className={styles.profileLabel}>{statusLabel}</span>
							</div>
						)}

						{/* Навигационные пункты */}
						{menuItems.map((item) => {
							const Icon = item.icon

							// Для пункта "Профиль" у авторизованного пользователя рендерится аватар
							const content =
								item.id === MENU_ITEM_IDS.profile ? (
									<>
										{profileSlot}
										<span className={styles.itemLabel}>{item.label}</span>
									</>
								) : (
									<>
										<Icon className={styles.itemIcon} aria-hidden="true" />
										<span className={styles.itemLabel}>{item.label}</span>
									</>
								)

							return item.href ? (
								<Link
									key={item.id}
									href={item.href}
									className={clsx('menu-item-text', styles.item)}
									onClick={closeMenu}
								>
									{content}
								</Link>
							) : (
								<button
									key={item.id}
									type="button"
									className={clsx('menu-item-text', styles.item)}
									onClick={() => {
										closeMenu()
										onLogout?.()
									}}
								>
									{content}
								</button>
							)
						})}
					</nav>
				</div>
			)}
		</>
	)
}
