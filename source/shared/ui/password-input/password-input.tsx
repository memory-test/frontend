'use client'

import { Eye, EyeOff } from 'lucide-react'
import {
	Label,
	unstable_PasswordToggleField as PasswordToggleField,
} from 'radix-ui'
import { useId } from 'react'
import styles from './styles.module.css'
import type { TPasswordInputProps } from './types'

export const PasswordInput = ({ label, id, ...props }: TPasswordInputProps) => {
	const generatedId = useId()
	const inputId = id ?? generatedId

	return (
		<div className={styles.inputWrapper}>
			{label && (
				<Label.Root htmlFor={inputId} className={styles.label}>
					{label}
				</Label.Root>
			)}

			<PasswordToggleField.Root>
				<div className={styles.inputRoot}>
					<PasswordToggleField.Input
						id={inputId}
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
		</div>
	)
}
