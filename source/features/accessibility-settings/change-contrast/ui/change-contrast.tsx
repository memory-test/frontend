'use client'

import { SettingCard } from '@shared/ui/setting-card'
import { Switch } from '@shared/ui/switch'
import { Target } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import {
	getSavedHighContrast,
	saveHighContrast,
} from '../lib/high-contrast-settings'
import { DEFAULT_HIGH_CONTRAST } from '../model/high-contrast'
import styles from './styles.module.css'
import type { TChangeContrastProps } from './types'

export const ChangeContrast: React.FC<TChangeContrastProps> = ({
	value,
	onChange,
}) => {
	const isControlled = value !== undefined
	const [internalValue, setInternalValue] = useState<boolean>(
		DEFAULT_HIGH_CONTRAST,
	)

	useEffect(() => {
		if (!isControlled) {
			setInternalValue(getSavedHighContrast())
		}
	}, [isControlled])

	const currentValue = isControlled ? value : internalValue

	const handleChange = (next: boolean) => {
		if (!isControlled) {
			setInternalValue(next)
			saveHighContrast(next)
		}

		onChange?.(next)
	}

	return (
		<SettingCard
			icon={Target}
			title="Контраст интерфейса"
			description="Сделать текст и кнопки более заметными"
		>
			<div className={styles.switchWrapper}>
				<label htmlFor="contrast-mode" className={styles.switchLabel}>
					Высокая контрастность
				</label>
				<Switch
					id="contrast-mode"
					checked={currentValue}
					onCheckedChange={handleChange}
				/>
			</div>
		</SettingCard>
	)
}
