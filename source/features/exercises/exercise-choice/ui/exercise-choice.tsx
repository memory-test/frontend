'use client'

import type { TExerciseState } from '@entities/exercise'
import { ExerciseBase } from '@shared/ui/exercise-base'
import { Surface } from '@shared/ui/surface'
import type { TToggleItem } from '@shared/ui/toggle-group'
import { ToggleGroup } from '@shared/ui/toggle-group'
import type React from 'react'
import { useRef, useState } from 'react'
import styles from './styles.module.css'
import type { TExerciseChoiceProps } from './types'

export const ExerciseChoice: React.FC<TExerciseChoiceProps> = ({
	id,
	title,
	description,
	question,
	answers_info: answersInfo,
}) => {
	const toggleItems: TToggleItem[] = answersInfo.map((answer) => ({
		value: String(answer.id),
		content: answer.text,
	}))

	const [toggleState, setToggleState] = useState('')
	const [exerciseState, setExerciseState] = useState<TExerciseState>('process')

	const elapsedTime = useRef(0)

	const handleOnNext = () => {
		setExerciseState('result')
	}

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
					isDisabled={!toggleState}
				>
					<Surface>
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
			)}

			{exerciseState === 'result' && <h1>результат</h1>}
		</section>
	)
}
