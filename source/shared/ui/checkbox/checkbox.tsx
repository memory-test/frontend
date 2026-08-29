'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import * as React from 'react'
import styles from './styles.module.css'
import type { TCheckboxProps } from './types'

export const Checkbox = React.forwardRef<
	React.ComponentRef<typeof CheckboxPrimitive.Root>,
	TCheckboxProps
>(({ className, label, id, ...props }, ref) => {
	const generatedId = React.useId()
	const checkboxId = id || `checkbox-${generatedId}`

	return (
		<div className={styles.wrapper}>
			<CheckboxPrimitive.Root
				ref={ref}
				id={checkboxId}
				className={clsx(styles.checkboxRoot, className)}
				{...props}
			>
				<CheckboxPrimitive.Indicator className={styles.checkboxIndicator}>
					<Check className={styles.checkIcon} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			{label && (
				<label htmlFor={checkboxId} className={styles.label}>
					{label}
				</label>
			)}
		</div>
	)
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName
