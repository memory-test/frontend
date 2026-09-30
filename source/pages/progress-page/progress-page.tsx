'use client'

import { useSessionStore } from '@entities/session'
import { ProgressCard } from '@shared/ui/progress-card'
import { Surface } from '@shared/ui/surface'
import { Trophy } from 'lucide-react'
import styles from './styles.module.css'

export const ProgressPage = () => {
	const progressPercent = useSessionStore(
		(state) => state.user?.progressPercent,
	)

	return (
		<section className={styles.section}>
			<h2 className={styles.title}>Ваш прогресс</h2>
			{progressPercent === undefined ? (
				<p>Идет загрузка...</p>
			) : (
				<Surface>
					<ProgressCard
						icon={<Trophy />}
						title="Пройденные задания"
						percentRate={progressPercent}
					/>
				</Surface>
			)}
		</section>
	)
}
