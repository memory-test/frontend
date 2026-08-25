'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import * as React from 'react'
import styles from './styles.module.css'
import type { TCheckboxProps } from './types'

export const Checkbox = React.forwardRef<
	React.ComponentRef<typeof CheckboxPrimitive.Root>,
	TCheckboxProps
>(({ className, label, id, showStatus, ...props }, ref) => {
	const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

	return (
		<div className={styles.wrapper}>
			<label htmlFor={checkboxId} className={styles.label}>
				<CheckboxPrimitive.Root
					ref={ref}
					id={checkboxId}
					className={clsx(styles.checkboxRoot, className)}
					{...props}
				>
					<CheckboxPrimitive.Indicator className={styles.checkboxIndicator}>
						<CheckIcon className={styles.checkIcon} />
					</CheckboxPrimitive.Indicator>
				</CheckboxPrimitive.Root>
				{label && <span>{label}</span>}
				{showStatus && (
					<span className={styles.status}>
						{props.checked === true
							? '✅ Да'
							: props.checked === false
								? '❌ Нет'
								: '—'}
					</span>
				)}
			</label>
		</div>
	)
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName
