import { Button } from '@shared/ui/button'
import type React from 'react'
import styles from './styles.module.css'
import type { TLinkGroupProps } from './types'

export const LinkGroup: React.FC<TLinkGroupProps> = ({
	activeLink,
	items,
	ariaLabel,
	className,
}) => {
	return (
		<nav aria-label={ariaLabel} className={className}>
			<ul className={styles.linkList}>
				{items.map((item) => {
					const isActive = item.href === activeLink

					return (
						<li key={item.href}>
							<Button
								href={item.href}
								variant={isActive ? 'default' : 'outline'}
								aria-current={isActive ? 'page' : undefined}
							>
								{item.label}
							</Button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
