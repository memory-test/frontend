'use client'

import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import styles from './styles.module.css'
import type { TTextInputProps } from './types'

export const TextInput = forwardRef<HTMLInputElement, TTextInputProps>(
	(
		{
			label,
			id,
			error,
			errorMessage,
			wrapperClassName,
			className,
			labelClassName,
			...props
		},
		ref,
	) => {
		const generatedId = useId()
		const inputId = id ?? generatedId
		const errorId = `${inputId}-error`
		const isInvalid = error || Boolean(errorMessage)

		return (
			<div className={clsx(styles.inputWrapper, wrapperClassName)}>
				{label && (
					<label
						htmlFor={inputId}
						className={clsx(styles.label, labelClassName)}
					>
						{label}
					</label>
				)}

				<input
					ref={ref}
					className={clsx(
						styles.input,
						isInvalid && styles.inputError,
						className,
					)}
					id={inputId}
					aria-invalid={isInvalid || undefined}
					aria-describedby={errorMessage ? errorId : undefined}
					{...props}
				/>

				{errorMessage && (
					<p id={errorId} className={styles.errorText}>
						{errorMessage}
					</p>
				)}
			</div>
		)
	},
)

TextInput.displayName = 'TextInput'
