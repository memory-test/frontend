'use client'

import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { Surface } from '@shared/ui/surface'
import { Timer } from '@shared/ui/timer'
import clsx from 'clsx'
import { CircleAlert } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles.module.css'
import type { TExerciseBaseProps } from './types'

export const ExerciseBase: React.FC<TExerciseBaseProps> = ({
	id,
	title,
	description,
	question,
	onTimeStop,
	onNext,
	isDisabled,
	children,
	className,
}) => {
	const [timerIsRunning, setTimerIsRunning] = useState(true)

	const handleOnNext = () => {
		setTimerIsRunning(false)
		onNext()
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
				<Timer isRunning={timerIsRunning} onStop={onTimeStop} />
			</div>

			<span className={styles.title}>{title}</span>

			<div className={styles.descriptionWrapper}>
				<CircleAlert
					size={32}
					strokeWidth={1.5}
					className={styles.descriptionIcon}
				/>
				<span className={styles.descriptionLabel}>Инструкция</span>
				<span className={styles.description}>{description}</span>
			</div>

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
