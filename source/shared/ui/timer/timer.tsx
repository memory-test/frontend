'use client'

import { formatTime } from '@shared/lib/format-time'
import clsx from 'clsx'
import { RotateCcwClock } from 'lucide-react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import type { TTimerProps } from './types'

export const Timer: React.FC<TTimerProps> = ({
	isRunning,
	onStop,
	className,
}) => {
	const [elapsedSeconds, setElapsedSeconds] = useState(0)

	const startedAtRef = useRef(0)
	const baseMsRef = useRef(0)
	const onStopRef = useRef(onStop)

	useEffect(() => {
		onStopRef.current = onStop
	}, [onStop])

	useEffect(() => {
		if (!isRunning) return

		startedAtRef.current = performance.now()

		const tick = () => {
			const elapsedMs =
				baseMsRef.current + (performance.now() - startedAtRef.current)

			setElapsedSeconds(Math.floor(elapsedMs / 1000))
		}

		tick()
		const intervalId = setInterval(tick, 250)

		return () => {
			clearInterval(intervalId)
			baseMsRef.current += performance.now() - startedAtRef.current
			const totalSeconds = Math.floor(baseMsRef.current / 1000)
			setElapsedSeconds(totalSeconds)
			onStopRef.current?.(totalSeconds)
		}
	}, [isRunning])

	return (
		<div className={clsx(styles.timerWrapper, className)}>
			<RotateCcwClock size={24} strokeWidth={1.5} />
			<span className={styles.timer}>{formatTime(elapsedSeconds)}</span>
		</div>
	)
}
