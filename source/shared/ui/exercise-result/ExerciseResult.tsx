import { ArrowLeft, BarChart3, CheckCircle2, Clock, X } from 'lucide-react' // Импорт иконок
import Link from 'next/link'
import type React from 'react'
import { Button } from '../button'
import { Surface } from '../surface'
import styles from './styles.module.css'
import type { ExerciseResultProps } from './types'

/**
 * Хелпер для форматирования даты в DD.MM.YYYY HH:mm
 * Без внешних библиотек
 */
const formatDate = (isoString: string): string => {
	const d = new Date(isoString)
	const time = d.getTime()
	if (Number.isNaN(time)) return ''

	const pad = (n: number) => n.toString().padStart(2, '0')

	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/**
 * Вспомогательный компонент для круговой диаграммы (SVG)
 */

// Константы для размеров
const SIZE = 100
const STROKE_WIDTH = 4
// Пересчитываем радиус, чтобы линия не обрезалась и занимала максимум места
const RADIUS = SIZE / 2 - STROKE_WIDTH / 2 // Результат: 48

interface ProgressCircleProps {
	percent: number
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ percent }) => {
	const circumference = 2 * Math.PI * RADIUS
	const safePercent = Number.isFinite(percent) ? percent : 0
	const strokeDashoffset = circumference - (safePercent / 100) * circumference

	return (
		<div className={styles.circleWrapper}>
			<svg
				width={SIZE}
				height={SIZE}
				viewBox={`0 0 ${SIZE} ${SIZE}`}
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				aria-label={`Результат выполнения задания: ${safePercent} процентов`}
				// Можно добавить класс, если нужны общие стили svg, но цвета зададим инлайн
			>
				{/* Серый фон кольца (Track) */}
				<circle
					cx={SIZE / 2}
					cy={SIZE / 2}
					r={RADIUS}
					fill="none"
					stroke="var(--color-exercise-track, #eff3f2)"
					strokeWidth={STROKE_WIDTH}
				/>

				{/* Зеленое кольцо прогресса (Fill) */}
				<circle
					cx={SIZE / 2}
					cy={SIZE / 2}
					r={RADIUS}
					fill="none"
					stroke="var(--color-exercise-progress, #5b8c7d)"
					strokeWidth={STROKE_WIDTH}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
					style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
				/>
			</svg>

			<span className={styles.percentText}>{safePercent}%</span>
		</div>
	)
}

export const ExerciseResult: React.FC<ExerciseResultProps> = ({
	exerciseName,
	date,
	resultPercent,
	timeSpent,
	userAmountRightAnswer,
	allAmountRightAnswer,
	onReset,
	onComplete,
}) => {
	const formattedDate = formatDate(date)

	// --- ПРЕОБРАЗОВАНИЕ ДАННЫХ (Single Source of Truth for numbers) ---

	const correctCount = Number(userAmountRightAnswer)
	const totalCount = Number(allAmountRightAnswer)
	const errorCount = totalCount - correctCount

	// Защита от NaN, если вдруг пришли мусорные данные
	const safeErrorCount = Number.isNaN(errorCount) ? 0 : errorCount

	let title = ''
	let description = ''

	if (resultPercent >= 80) {
		title = 'Отличный результат!'
		description = 'Вы успешно выполнили задание. Продолжайте в том же духе!'
	} else if (resultPercent >= 50) {
		title = 'Хороший результат'
		description = 'Есть куда расти. Попробуйте повторить упражнение.'
	} else {
		title = 'Нужно потренироваться'
		description =
			'Не расстраивайтесь, попробуйте еще раз сосредоточиться на деталях.'
	}

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<Link href="/catalog" className={styles.backBtn}>
					<ArrowLeft />
					<span>Назад к списку упражнений</span>
				</Link>
				<h1 className={styles.pageTitle}>Результаты задания</h1>
				<div className={styles.description}>
					<p className={styles.subtitle}>
						<span>Упражнение: </span>
						<span>{exerciseName}</span>
					</p>
					<p className={styles.dateLabel}>
						<span>ДАТА: </span>
						<span className={styles.date}>{formattedDate}</span>
					</p>
				</div>
			</div>

			{/* Основной блок с результатом */}
			<Surface className={styles.mainCard}>
				<ProgressCircle percent={resultPercent} />

				<div className={styles.resultInfo}>
					<h2 className={styles.resultTitle}>{title}</h2>
					<p className={styles.resultDesc}>{description}</p>
				</div>
			</Surface>

			{/* Блок статистики с иконками Lucide */}
			<Surface className={styles.stats}>
				<div className={styles.statItem}>
					<div className={styles.iconBox}>
						<Clock strokeWidth={1.5} />
					</div>
					<span className={styles.statLabel}>Время выполнения</span>
					<strong className={styles.statValue}>{timeSpent}</strong>
				</div>

				<div className={styles.statItem}>
					<div className={styles.iconBox}>
						<CheckCircle2 strokeWidth={1.5} />
					</div>
					<span className={styles.statLabel}>Правильные ответы</span>
					{/* Используем оригинальные строки для отображения дроби, 
                        чтобы не потерять форматирование бэкенда, если оно специфично */}
					<strong className={styles.statValue}>
						{userAmountRightAnswer}/{allAmountRightAnswer}
					</strong>
				</div>

				<div className={styles.statItem}>
					<div className={styles.iconBox}>
						<X strokeWidth={1.5} />
					</div>
					<span className={styles.statLabel}>Количество ошибок</span>
					{/* Используем уже посчитанное число */}
					<strong className={styles.statValue}>{safeErrorCount}</strong>
				</div>

				<div className={styles.statItem}>
					<div className={styles.iconBox}>
						<BarChart3 strokeWidth={1.5} />
					</div>
					<span className={styles.statLabel}>Лучший результат</span>
					<strong className={styles.statValue}>{resultPercent}%</strong>
				</div>
			</Surface>

			{/* Кнопки действий */}
			<div className={styles.actions}>
				<Button
					type="button"
					variant="outline"
					onClick={onReset}
					size="md"
					className={styles.btn}
				>
					Повторить
				</Button>
				<Button
					type="button"
					variant="default"
					size="md"
					onClick={onComplete}
					className={styles.btn}
				>
					Завершить
				</Button>
			</div>
		</section>
	)
}
