import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import type * as React from 'react'
import styles from './styles.module.css'
import type { TProfileTab, TProfileTabsProps } from './types'

export const ProfileTabs: React.FC<TProfileTabsProps> = ({
	activeTab,
	onTabChange,
	tabs,
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
			<TabsPrimitive.List
				className={styles.list}
				aria-label="Навигация по профилю"
			>
				{tabs.map(({ value, label }) => (
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

			{tabs.map(({ value, content }) => (
				<TabsPrimitive.Content key={value} value={value}>
					{content}
				</TabsPrimitive.Content>
			))}
		</TabsPrimitive.Root>
	)
}

ProfileTabs.displayName = 'ProfileTabs'
