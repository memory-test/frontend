'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { desktopAccountItems, desktopNavItems } from '../menu-config'
import type { TDesktopMenuProps } from '../types'
import { MENU_ITEM_IDS } from '../types'
import styles from './desktop-menu.module.css'

export const DesktopMenu: React.FC<TDesktopMenuProps> = ({
	accountSlot,
	authSlot,
	profileSlot,
	notificationsSlot,
	onLogout,
	className,
}) => {
	const [open, setOpen] = useState(false)
	const accountRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		const onPointerDown = (e: PointerEvent) => {
			if (!accountRef.current?.contains(e.target as Node)) setOpen(false)
		}
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open])

	const closeMenu = () => setOpen(false)

	const renderItem = (item: (typeof desktopAccountItems)[number]) => {
		const Icon = item.icon
		const inner = (
			<>
				{item.id === MENU_ITEM_IDS.profile ? (
					profileSlot
				) : (
					<Icon className={styles.itemIcon} aria-hidden="true" />
				)}
				<span className={styles.itemLabel}>{item.label}</span>
			</>
		)

		return item.href ? (
			<Link
				key={item.id}
				href={item.href}
				className={clsx('menu-item-text', styles.dropdownItem)}
				onClick={closeMenu}
			>
				{inner}
			</Link>
		) : (
			<button
				key={item.id}
				type="button"
				className={clsx('menu-item-text', styles.dropdownItem)}
				onClick={() => {
					closeMenu()
					onLogout?.()
				}}
			>
				{inner}
			</button>
		)
	}

	return (
		<div className={clsx(styles.menu, className)}>
			<nav className={styles.nav} aria-label="Основная навигация">
				{desktopNavItems.map((item) => (
					<Link
						key={item.id}
						href={item.href}
						className={clsx('menu-item-text', styles.navLink)}
					>
						{item.label}
					</Link>
				))}
			</nav>

			{notificationsSlot}

			{/* Либо аккаунт с дропдауном, либо слот авторизации */}
			{accountSlot ? (
				<div className={styles.account} ref={accountRef}>
					<button
						type="button"
						className={styles.accountButton}
						aria-haspopup="menu"
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
					>
						{accountSlot}
					</button>
					{open && (
						<div className={styles.dropdown} role="menu">
							{desktopAccountItems.map(renderItem)}
						</div>
					)}
				</div>
			) : (
				authSlot
			)}
		</div>
	)
}
