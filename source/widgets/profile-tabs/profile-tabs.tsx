'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import type * as React from 'react'
import styles from './styles.module.css'
import type { TProfileTab, TProfileTabsProps } from './types'

const TAB_ITEMS: { value: TProfileTab; label: string }[] = [
	{ value: 'profile', label: 'Профиль' },
	{ value: 'progress', label: 'Прогресс' },
	{ value: 'settings', label: 'Настройки' },
]

export const ProfileTabs: React.FC<TProfileTabsProps> = ({
	activeTab,
	onTabChange,
	className,
}) => {
	const handleValueChange = (value: string) => {
		if (onTabChange) {
			onTabChange(value as TProfileTab)
		}
	}

	return (
		<TabsPrimitive.Root
			value={activeTab}
			onValueChange={handleValueChange}
			className={clsx(styles.root, className)}
		>
			<TabsPrimitive.List className={styles.list}>
				{TAB_ITEMS.map(({ value, label }) => (
					<TabsPrimitive.Trigger
						key={value}
						value={value}
						className={clsx(styles.trigger, {
							[styles.triggerActive]: activeTab === value,
						})}
					>
						{label}
					</TabsPrimitive.Trigger>
				))}
			</TabsPrimitive.List>
		</TabsPrimitive.Root>
	)
}

ProfileTabs.displayName = 'ProfileTabs'
