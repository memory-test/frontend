'use client'

import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import {
	Label,
	unstable_PasswordToggleField as PasswordToggleField,
} from 'radix-ui'
import { forwardRef, useId } from 'react'
import styles from './styles.module.css'
import type { TPasswordInputProps } from './types'

export const PasswordInput = forwardRef<HTMLInputElement, TPasswordInputProps>(
	({ label, id, error, errorMessage, className, ...props }, ref) => {
		const generatedId = useId()
		const inputId = id ?? generatedId
		const errorId = `${inputId}-error`
		const isInvalid = error || Boolean(errorMessage)

		return (
			<div className={styles.inputWrapper}>
				{label && (
					<Label.Root htmlFor={inputId} className={styles.label}>
						{label}
					</Label.Root>
				)}

				<PasswordToggleField.Root>
					<div
						className={clsx(
							styles.inputRoot,
							isInvalid && styles.inputRootError,
							className,
						)}
					>
						<PasswordToggleField.Input
							ref={ref}
							id={inputId}
							aria-invalid={isInvalid || undefined}
							aria-describedby={errorMessage ? errorId : undefined}
							{...props}
							className={styles.input}
						/>
						<PasswordToggleField.Toggle className={styles.toggle}>
							<PasswordToggleField.Icon
								visible={<Eye size={24} />}
								hidden={<EyeOff size={24} />}
							/>
						</PasswordToggleField.Toggle>
					</div>
				</PasswordToggleField.Root>

				{errorMessage && (
					<p id={errorId} className={styles.errorText}>
						{errorMessage}
					</p>
				)}
			</div>
		)
	},
)

PasswordInput.displayName = 'PasswordInput'
