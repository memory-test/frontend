'use client'

import { useId } from 'react'
import styles from './styles.module.css'
import type { TTextInputProps } from './types'

export const TextInput = ({ label, id, ...props }: TTextInputProps) => {
	const generatedId = useId()
	const inputId = id ?? generatedId

	return (
		<div className={styles.inputWrapper}>
			{label && (
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
			)}

			<input className={styles.input} id={inputId} {...props} />
		</div>
	)
}
