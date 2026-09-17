'use client'

import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import styles from './birth-date-selects.module.css'

type TBirthDateSelectsProps = {
	day: string
	month: string
	year: string
	onChange: (field: 'day' | 'month' | 'year', value: string) => void
}

// Генерация опций
const days = Array.from({ length: 31 }, (_, i) =>
	String(i + 1).padStart(2, '0'),
)
const months = Array.from({ length: 12 }, (_, i) =>
	String(i + 1).padStart(2, '0'),
)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i))

// Внутренний переиспользуемый компонент
const DateSelect: React.FC<{
	value: string
	onValueChange: (value: string) => void
	placeholder: string
	options: string[]
	'aria-label': string
}> = ({ value, onValueChange, placeholder, options, ...rest }) => (
	<Select.Root value={value} onValueChange={onValueChange}>
		<Select.Trigger className={styles.trigger} aria-label={rest['aria-label']}>
			<Select.Value placeholder={placeholder} className={styles.placeholder} />
			<Select.Icon className={styles.icon}>
				<ChevronDown size={24} />
			</Select.Icon>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				className={styles.content}
				position="popper"
				sideOffset={4}
			>
				<Select.Viewport className={styles.viewport}>
					{options.map((option) => (
						<Select.Item key={option} value={option} className={styles.item}>
							<Select.ItemText>{option}</Select.ItemText>
							<Select.ItemIndicator className={styles.indicator}>
								<Check size={12} />
							</Select.ItemIndicator>
						</Select.Item>
					))}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
)

export const BirthDateSelects: React.FC<TBirthDateSelectsProps> = ({
	day,
	month,
	year,
	onChange,
}) => {
	return (
		<div className={styles.selectsWrapper}>
			<DateSelect
				value={day}
				onValueChange={(value) => onChange('day', value)}
				placeholder="дата"
				options={days}
				aria-label="День рождения"
			/>
			<DateSelect
				value={month}
				onValueChange={(value) => onChange('month', value)}
				placeholder="месяц"
				options={months}
				aria-label="Месяц рождения"
			/>
			<DateSelect
				value={year}
				onValueChange={(value) => onChange('year', value)}
				placeholder="год"
				options={years}
				aria-label="Год рождения"
			/>
		</div>
	)
}
