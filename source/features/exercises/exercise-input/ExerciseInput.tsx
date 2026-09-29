'use client'

import type {
	TExerciseState,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { Button } from '@shared/ui/button'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import { Surface } from '@shared/ui/surface'
import { TextInput } from '@shared/ui/text-input'
import type { TTimerResult } from '@shared/ui/timer'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TExerciseInputProps } from './types'

interface AnswerItem {
	id: string
	value: string
}

export const ExerciseInput: React.FC<TExerciseInputProps> = ({
	id,
	title,
	description,
	question,
	onPass,
}) => {
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')
	const [answers, setAnswers] = useState<AnswerItem[]>([
		{ id: crypto.randomUUID(), value: '' },
	])
	const [resultData, setResultData] = useState<TResultExercise | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [timing, setTiming] = useState<TTimerResult | null>(null)

	const router = useRouter()

	const handleChange = (id: string, newValue: string) => {
		setError(null)
		setAnswers((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, value: newValue } : item,
			),
		)
	}

	const addAnswerField = () => {
		setAnswers((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
	}

	const removeAnswerField = (id: string) => {
		setAnswers((prev) =>
			prev.length > 1 ? prev.filter((item) => item.id !== id) : prev,
		)
	}

	const handleOnNext = async (timingResult: TTimerResult) => {
		const validAnswers = answers
			.map((item) => item.value.trim())
			.filter((value) => value.length > 0)

		if (validAnswers.length === 0 || isLoading) return

		setTiming(timingResult)
		setIsLoading(true)
		setError(null)

		try {
			const payload: TPassExercisePayload<'input'> = {
				started_at: timingResult.startedAt,
				finished_at: timingResult.finishedAt,
				duration_seconds: timingResult.durationSeconds,
				answers: validAnswers,
			}

			const response = await onPass(payload)

			setResultData(response)
			setExerciseState('result')
		} catch (err: unknown) {
			console.error('Ошибка при проверке задания:', err)

			const errorData = (
				err as { response?: { data?: { detail?: string; answers?: string[] } } }
			)?.response?.data

			const errorMessage =
				errorData?.detail ||
				errorData?.answers?.[0] ||
				'Произошла ошибка при проверке ответа. Попробуйте ещё раз.'

			setError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	const handleReset = () => {
		setExerciseState('process')
		setAnswers([{ id: crypto.randomUUID(), value: '' }])
		setResultData(null)
		setTiming(null)
		setError(null)
	}

	const handleComplete = () => {
		router.replace('/catalog')
	}

	// --- СТЕЙТ RESULT ---
	if (exerciseState === 'result' && resultData && timing) {
		const totalAnswers =
			answers.filter((item) => item.value.trim().length > 0).length || 1
		const correctAnswers = Math.round(resultData.score * totalAnswers)

		return (
			<ExerciseResult
				exerciseName={title}
				date={timing.finishedAt}
				resultPercent={Math.round(resultData.score * 100)}
				timeSpent={formatTime(timing.durationSeconds)}
				userAmountRightAnswer={correctAnswers.toString()}
				allAmountRightAnswer={totalAnswers.toString()}
				onReset={handleReset}
				onComplete={handleComplete}
			/>
		)
	}

	// --- СТЕЙТ PROCESS ---
	const isDisabled =
		!answers.some((item) => item.value.trim().length > 0) || isLoading

	return (
		<section>
			{exerciseState === 'process' && (
				<ExerciseBase
					id={id}
					title={title}
					description={description}
					question={question || description || 'Введите ответ'}
					onNext={handleOnNext}
					isDisabled={isDisabled}
				>
					<Surface className={styles.inputContainer}>
						{error && (
							<div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">
								⚠️ {error}
							</div>
						)}
						<div className={styles.answersList}>
							{answers.map((item, index) => (
								<div key={item.id} className={styles.answerRow}>
									<TextInput
										type="text"
										className={styles.inputField}
										placeholder="Введите ответ..."
										value={item.value}
										onChange={(e) => handleChange(item.id, e.target.value)}
										disabled={isLoading}
										autoFocus={index === 0}
									/>
									{answers.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="md"
											onClick={() => removeAnswerField(item.id)}
											aria-label="Удалить вариант"
											disabled={isLoading}
											className={styles.removeButton}
										>
											<X size={20} />
										</Button>
									)}
								</div>
							))}
						</div>

						<Button
							type="button"
							variant="outline"
							className={styles.addBtn}
							onClick={addAnswerField}
							disabled={isLoading}
						>
							+ Добавить ещё вариант
						</Button>
					</Surface>
				</ExerciseBase>
			)}
		</section>
	)
}
