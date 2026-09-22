export interface ExerciseResultProps {
	exerciseName: string
	/** ISO строка, например "2026-05-25T14:30:00" */
	date: string
	resultPercent: number // Число от 0 до 100
	timeSpent: string // Например "00:25"
	// Строго по ТЗ: строки
	userAmountRightAnswer: string
	allAmountRightAnswer: string
	onReset: () => void
	onComplete: () => void
}
