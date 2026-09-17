import type { TEditForm } from './types'

// Хелпер: собрать birth_date из формы
export const buildBirthDate = (
	day: string,
	month: string,
	year: string,
): string | null => {
	if (!day || !month || !year) return null
	return `${year}-${month}-${day}`
}

// Хелпер: распарсить birth_date в форму
export const parseBirthDate = (
	birthDate: string | null,
): Pick<TEditForm, 'day' | 'month' | 'year'> => {
	if (!birthDate) return { day: '', month: '', year: '' }
	const [year, month, day] = birthDate.split('-')
	return { day, month, year }
}
