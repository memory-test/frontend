'use client'

import type {
	TExerciseState,
	TPassExercisePayload,
	TResultExercise,
} from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import { Surface } from '@shared/ui/surface'
import type { TTimerResult } from '@shared/ui/timer'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import type { TMatchingColumns } from '../model/types'
import { useMatching } from '../model/use-matching'
import styles from './styles.module.css'
import type { TExerciseMatchingProps } from './types'

export const ExerciseMatching: React.FC<TExerciseMatchingProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
	onPass,
}) => {
	const router = useRouter()

	const {
		columns,
		pairs,
		selection,
		selectItem,
		isComplete,
		buildPairs,
		resetPairs,
	} = useMatching(answersInfo)

	const [timing, setTiming] = useState<TTimerResult | null>(null)
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')

	const [resultData, setResultData] = useState<TResultExercise | null>(null)
	const [error, setError] = useState<string | null>(null)

	const pairNumbers = new Map<string, number>()

	Object.entries(pairs).forEach(([firstId, secondId], index) => {
		pairNumbers.set(firstId, index + 1)
		pairNumbers.set(secondId, index + 1)
	})

	const handleOnNext = async (timing: TTimerResult) => {
		setTiming(timing)
		setError(null)

		const payload: TPassExercisePayload<'matching'> = {
			started_at: timing.startedAt,
			finished_at: timing.finishedAt,
			duration_seconds: timing.durationSeconds,
			pairs: buildPairs(),
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
		resetPairs()
		setExerciseState('process')
		setResultData(null)
		setTiming(null)
		setError(null)
	}

	const renderColumn = (side: keyof TMatchingColumns) =>
		columns[side].map((item) => {
			const pairNumber = pairNumbers.get(item.id)
			const isSelected = selection?.id === item.id

			return (
				<Button
					key={item.id}
					variant={isSelected || pairNumber ? 'default' : 'outline'}
					onClick={() => selectItem(item.id, side)}
					aria-pressed={isSelected}
					iconAfter={
						pairNumber ? (
							<span className={styles.pairBadge} aria-hidden="true">
								{pairNumber}
							</span>
						) : undefined
					}
				>
					{item.text}
				</Button>
			)
		})

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
						isDisabled={!isComplete}
					>
						<Surface>
							{error && (
								<p role="alert" className={styles.error}>
									⚠️ {error}
								</p>
							)}

							<div className={styles.board}>
								<div className={styles.column}>{renderColumn('first')}</div>
								<div className={styles.column}>{renderColumn('second')}</div>
							</div>
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
