'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { ExerciseInstruction } from '@shared/ui/exercise-instruction'
import { Surface } from '@shared/ui/surface'
import type { TTimerResult } from '@shared/ui/timer'
import { Timer } from '@shared/ui/timer'
import clsx from 'clsx'
import Link from 'next/link'
import { useRef, useState } from 'react'
import styles from './styles.module.css'
import type { TExerciseBaseProps } from './types'

export const ExerciseBase: React.FC<TExerciseBaseProps> = ({
	id,
	title,
	description,
	question,
	onNext,
	isDisabled,
	children,
	className,
}) => {
	const [timerIsRunning, setTimerIsRunning] = useState(true)

	const isFinishingRef = useRef(false)

	const handleOnNext = () => {
		isFinishingRef.current = true
		setTimerIsRunning(false)
	}

	const handleTimerStop = (timing: TTimerResult) => {
		if (!isFinishingRef.current) return

		onNext(timing)
	}

	return (
		<div className={clsx(styles.baseWrapper, className)}>
			<Link
				href={createUrl(routerPath.exercise, { id: String(id) })}
				className={styles.link}
			>
				← К инструкции
			</Link>

			<div className={styles.timerWrapper}>
				<span>Выполнение упражнения</span>
				<Timer isRunning={timerIsRunning} onStop={handleTimerStop} />
			</div>

			<span className={styles.title}>{title}</span>

			<ExerciseInstruction text={description} />

			<Surface className={styles.question}>
				<span>{question}</span>
			</Surface>

			{children}

			<Button
				onClick={handleOnNext}
				disabled={isDisabled}
				className={styles.button}
			>
				Дальше
			</Button>
		</div>
	)
}
