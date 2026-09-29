'use client'

import type {
	TExerciseState,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { createUrl, routerPath } from '@shared/lib/routes'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import { Surface } from '@shared/ui/surface'
import type { TTimerResult } from '@shared/ui/timer'
import type { TToggleItem } from '@shared/ui/toggle-group'
import { ToggleGroup } from '@shared/ui/toggle-group'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TExerciseChoiceProps } from './types'

export const ExerciseChoice: React.FC<TExerciseChoiceProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
	onPass,
}) => {
	const router = useRouter()

	const toggleItems: TToggleItem[] = answersInfo.map((answer) => ({
		value: String(answer.id),
		content: answer.text,
	}))

	const [toggleState, setToggleState] = useState('')

	const [timing, setTiming] = useState<TTimerResult | null>(null)
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')

	const [resultData, setResultData] = useState<TResultExercise | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleOnNext = async (timing: TTimerResult) => {
		setTiming(timing)
		setError(null)

		const payload: TPassExercisePayload<'choice'> = {
			started_at: timing.startedAt,
			finished_at: timing.finishedAt,
			duration_seconds: timing.durationSeconds,
			answers_ids: [+toggleState],
		}

		try {
			const response = await onPass(payload)

			setResultData(response)
			setExerciseState('result')
		} catch (err) {
			console.error(err)

			setError(
				err instanceof Error
					? err.message
					: 'Что-то пошло не так. Попробуйте обновить страницу',
			)
		}
	}

	const handleReset = () => {
		setToggleState('')
		setExerciseState('process')
		setResultData(null)
		setTiming(null)
		setError(null)
	}

	return (
		<>
			{exerciseState === 'process' && (
				<section>
					<ExerciseBase
						id={id}
						title={title}
						description={description}
						question={question}
						onNext={handleOnNext}
						isDisabled={!toggleState}
					>
						<Surface>
							{error && (
								<p role="alert" className={styles.error}>
									⚠️ {error}
								</p>
							)}

							<ToggleGroup
								className={styles.toggle}
								type="single"
								items={toggleItems}
								variant="buttons"
								value={toggleState}
								onValueChange={(value) => {
									if (value) setToggleState(value)
								}}
							/>
						</Surface>
					</ExerciseBase>
				</section>
			)}

			{exerciseState === 'result' && timing && resultData && (
				<ExerciseResult
					exerciseName={title}
					date={timing.finishedAt}
					timeSpent={formatTime(timing.durationSeconds)}
					resultPercent={resultData.score}
					userAmountRightAnswer="17"
					allAmountRightAnswer="20"
					onReset={handleReset}
					onComplete={() => {
						router.replace(createUrl(routerPath.catalog))
					}}
				/>
			)}
		</>
	)
}
