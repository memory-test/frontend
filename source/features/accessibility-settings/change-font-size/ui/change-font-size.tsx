'use client'

import { SettingCard } from '@shared/ui/setting-card'
import { ToggleGroup } from '@shared/ui/toggle-group'
import { ALargeSmall } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { applyFontSize } from '../lib/apply-font-size'
import { fontSizeStorage } from '../lib/font-size-storage'
import type { TFontSize } from '../model/font-size'
import { DEFAULT_FONT_SIZE, FONT_SIZES } from '../model/font-size'
import type { TChangeFontSizeProps } from './types'

const labels: Record<TFontSize, string> = {
	sm: 'Маленький',
	md: 'Средний',
	lg: 'Крупный',
	xlg: 'Очень крупный',
}

const toggleItems = FONT_SIZES.map((value) => ({
	value,
	content: labels[value],
}))

export const ChangeFontSize: React.FC<TChangeFontSizeProps> = ({
	value,
	onChange,
}) => {
	const isControlled = value !== undefined
	const [internalValue, setInternalValue] =
		useState<TFontSize>(DEFAULT_FONT_SIZE)

	useEffect(() => {
		if (!isControlled) {
			setInternalValue(fontSizeStorage.get())
		}
	}, [isControlled])

	const currentValue = isControlled ? value : internalValue

	const handleChange = (next: TFontSize) => {
		if (!next) return

		if (!isControlled) {
			setInternalValue(next)
			fontSizeStorage.set(next)
			applyFontSize(next)
		}

		onChange?.(next)
	}

	return (
		<SettingCard
			icon={ALargeSmall}
			title="Размер шрифта"
			description="Изменить размер текста во всём приложении"
		>
			<ToggleGroup
				type="single"
				items={toggleItems}
				value={currentValue}
				onValueChange={handleChange}
			/>
		</SettingCard>
	)
}
