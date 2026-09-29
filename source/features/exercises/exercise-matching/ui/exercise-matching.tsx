'use client'

import type { TExerciseState } from '@entities/exercise'
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

	const pairNumbers = new Map<string, number>()

	Object.entries(pairs).forEach(([firstId, secondId], index) => {
		pairNumbers.set(firstId, index + 1)
		pairNumbers.set(secondId, index + 1)
	})

	const handleOnNext = (timing: TTimerResult) => {
		setTiming(timing)

		const payload = {
			started_at: timing.startedAt,
			finished_at: timing.finishedAt,
			duration_seconds: timing.durationSeconds,
			pairs: buildPairs(),
		}

		// TODO: hook
		console.log(payload)

		setExerciseState('result')
	}

	const handleReset = () => {
		resetPairs()
		setExerciseState('process')
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
						<Surface className={styles.board}>
							<div className={styles.column}>{renderColumn('first')}</div>
							<div className={styles.column}>{renderColumn('second')}</div>
						</Surface>
					</ExerciseBase>
				</section>
			)}
			{/* TODO: некоторые пропсы замоканы */}
			{exerciseState === 'result' && timing && (
				<ExerciseResult
					exerciseName={title}
					date={timing.finishedAt}
					timeSpent={formatTime(timing.durationSeconds)}
					resultPercent={75}
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
