// source/pages/dashboard-page/dashboard-page.tsx

'use client'

import { useSessionStore } from '@entities/session' // <-- Читаем из стора
import { Button } from '@shared/ui/button'
import { ProgressCard } from '@shared/ui/progress-card'
import { Surface } from '@shared/ui/surface'
import { Highlight } from '@widgets/highlight'
import { Target } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import styles from './styles.module.css'

const formatDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): string => {
	const map = { easy: 'Лёгкий', medium: 'Средний', hard: 'Сложный' }
	return map[difficulty] || difficulty
}

const getDifficultyColor = (
	difficulty: 'easy' | 'medium' | 'hard',
): 'primary' | 'warning' | 'error' => {
	switch (difficulty) {
		case 'easy':
			return 'primary'
		case 'medium':
			return 'warning'
		case 'hard':
			return 'error'
		default:
			return 'primary'
	}
}

export const DashboardPage: React.FC = () => {
	const router = useRouter()

	// Влад сделает так, чтобы в сторе лежал актуальный пользователь
	const user = useSessionStore((state) => state.user)

	// Если стор еще не загрузился или пользователь не авторизован
	if (!user) {
		return <div className={styles.loader}>Загрузка профиля...</div>
	}

	const handleStartTraining = () => {
		router.push('/catalog')
	}

	return (
		<main className={styles.container}>
			<Surface className={styles.welcomeCard}>
				<Highlight
					title={`Приветствуем, ${user.name}!`}
					subtitle="Текущий уровень сложности:"
					tagText={formatDifficulty(user.currentDifficulty)}
					tagColor={getDifficultyColor(user.currentDifficulty)}
					actionSlot={
						<Button onClick={handleStartTraining}>Начать тренировку</Button>
					}
				/>
			</Surface>

			<Surface className={styles.progressSection}>
				<h2 className={styles.sectionTitle}>Ваш прогресс</h2>
				<ProgressCard
					icon={<Target size={24} className={styles.progressIcon} />}
					title="Общий результат занятий"
					percentRate={Math.round(user.progressPercent)} // Влад добавит это поле в IUser
				/>
			</Surface>
		</main>
	)
}
