import type { TExerciseState } from '@entities/exercise'
import { formatTime } from '@shared/lib/format-time'
import { Button } from '@shared/ui/button'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { ExerciseResult } from '@shared/ui/exercise-result'
import type React from 'react'
import { useRef, useState } from 'react'
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
	const { columns, pairs, selection, selectItem, isComplete } =
		useMatching(answersInfo)

	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')

	const elapsedTime = useRef(0)

	const pairNumbers = new Map<string, number>()

	Object.entries(pairs).forEach(([firstId, secondId], index) => {
		pairNumbers.set(firstId, index + 1)
		pairNumbers.set(secondId, index + 1)
	})

	const handleOnNext = () => {
		setExerciseState('result')
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
		<section>
			{exerciseState === 'process' && (
				<ExerciseBase
					id={id}
					title={title}
					description={description}
					question={question}
					onTimeStop={(time) => (elapsedTime.current = time)}
					onNext={handleOnNext}
					isDisabled={!isComplete}
				>
					<div className={styles.board}>
						<div className={styles.column}>{renderColumn('first')}</div>
						<div className={styles.column}>{renderColumn('second')}</div>
					</div>
				</ExerciseBase>
			)}

			{/* {exerciseState === 'result' && (
      <ExerciseResult
        exerciseName={title}
        timeSpent={formatTime(elapsedTime)}
        resultPercent={}
      />
    )} */}
		</section>
	)
}
