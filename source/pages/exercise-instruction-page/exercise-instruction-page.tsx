'use client'

import { useGetExerciseById } from '@entities/exercise'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { ExerciseInstruction } from '@shared/ui/exercise-instruction'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import styles from './styles.module.css'
import type { TExerciseInstructionPageProps } from './types'

export const ExerciseInstructionPage: React.FC<
	TExerciseInstructionPageProps
> = ({ id }) => {
	const { data, isPending, isError, error } = useGetExerciseById(id)

	const router = useRouter()

	if (isPending) return <main>Загрузка...</main>
	if (isError) return <main>Не удалось загрузить задание: {error.message}</main>

	return (
		<main>
			<section className={styles.pageWrapper}>
				<Link href={createUrl(routerPath.catalog)} className={styles.link}>
					← К каталогу
				</Link>
				<h1 className={styles.title}>Инструкция к заданию</h1>
				<p className={styles.text}>
					Перед началом упражнения, пожалуйста, ознакомьтесь с правилами
					выполнения задания.
				</p>
				<ExerciseInstruction text={data.description} />
				<Button
					className={styles.button}
					onClick={() =>
						router.push(
							createUrl(routerPath.exerciseProcess, { id: String(id) }),
						)
					}
				>
					Начать
				</Button>
			</section>
		</main>
	)
}
