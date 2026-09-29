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

	const startedAtRef = useRef<string | null>(null)
	const startedMsRef = useRef(0)
	const baseMsRef = useRef(0)
	const onStopRef = useRef(onStop)

	useEffect(() => {
		onStopRef.current = onStop
	}, [onStop])

	useEffect(() => {
		if (!isRunning) return

		if (startedAtRef.current === null) {
			startedAtRef.current = new Date().toISOString()
		}

		const startedAt = startedAtRef.current

		startedMsRef.current = performance.now()

		const tick = () => {
			const elapsedMs =
				baseMsRef.current + (performance.now() - startedMsRef.current)

			setElapsedSeconds(Math.floor(elapsedMs / 1000))
		}

		tick()
		const intervalId = setInterval(tick, 250)

		return () => {
			clearInterval(intervalId)

			baseMsRef.current += performance.now() - startedMsRef.current

			setElapsedSeconds(Math.floor(baseMsRef.current / 1000))

			onStopRef.current?.({
				startedAt,
				finishedAt: new Date().toISOString(),
				durationSeconds: Math.round(baseMsRef.current / 1000),
			})
		}
	}, [isRunning])

	return (
		<div className={clsx(styles.timerWrapper, className)}>
			<RotateCcwClock size={24} strokeWidth={1.5} />
			<span className={styles.timer}>{formatTime(elapsedSeconds)}</span>
		</div>
	)
}
