'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import type * as React from 'react'
import styles from './styles.module.css'
import type { TSelectProps } from './types'

export const Select: React.FC<TSelectProps> = ({
	placeholder,
	options,
	className,
	disabled,
	...props
}) => {
	return (
		<SelectPrimitive.Root disabled={disabled} {...props}>
			<SelectPrimitive.Trigger
				className={clsx(styles.trigger, className)}
				aria-label={props['aria-label']}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon className={styles.icon}>
					<ChevronDown size={16} />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					className={styles.content}
					position="popper"
					sideOffset={4}
				>
					<SelectPrimitive.ScrollUpButton className={styles.scrollButton}>
						<ChevronUp size={16} />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className={styles.viewport}>
						{options.map((option) => (
							<SelectPrimitive.Item
								key={option.value}
								value={option.value}
								className={styles.item}
							>
								<SelectPrimitive.ItemText>
									{option.label}
								</SelectPrimitive.ItemText>
								<SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
									<Check size={16} />
								</SelectPrimitive.ItemIndicator>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className={styles.scrollButton}>
						<ChevronDown size={16} />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	)
}

Select.displayName = 'Select'
