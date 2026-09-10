import type { TDifficulty } from '../model/types'

const STORAGE_KEY = 'difficulty'

const isDifficulty = (value: unknown): value is TDifficulty =>
	value === 'easy' || value === 'medium' || value === 'hard' || value === 'auto'

export const difficultyStorage = {
	get: (): TDifficulty | null => {
		if (typeof window === 'undefined') return null

		const raw = localStorage.getItem(STORAGE_KEY)

		return isDifficulty(raw) ? raw : null
	},
	set: (value: TDifficulty) => {
		localStorage.setItem(STORAGE_KEY, value)
	},
}
