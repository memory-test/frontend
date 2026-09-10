import { createUrl, routerPath } from '@shared/lib/routes'
import { Button, buttonStylees } from '@shared/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import styles from './styles.module.css'
import type { TExerciseCardProps } from './types'

export const ExerciseCard: React.FC<TExerciseCardProps> = ({
	title,
	image,
	slot,
	onStart,
	onDescription,
	className,
}) => {
	return (
		<article className={clsx(styles.card, className)}>
			<span className={styles.title}>{title}</span>
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					src={image}
					alt="Иллюстрация задания"
					width={284}
					height={208}
				/>
				<div className={styles.slotWrapper}>{slot}</div>
			</div>
			<div className={styles.buttonContainer}>
				{typeof onStart === 'string' ? (
					<Link
						href={createUrl(routerPath.exercise, { id: onStart })}
						className={clsx(
							buttonStylees.button,
							buttonStylees.default,
							buttonStylees.sm,
							styles.button,
							styles.link,
						)}
					>
						Начать
					</Link>
				) : (
					<Button onClick={onStart} size="sm" className={styles.button}>
						Начать
					</Button>
				)}
				<Button
					variant="outline"
					onClick={onDescription}
					size="sm"
					className={styles.button}
				>
					Подробнее
				</Button>
			</div>
		</article>
	)
}
