'use client'

import type { CheckedState } from '@radix-ui/react-checkbox'
import { Button } from '@shared/ui/button'
import { Checkbox } from '@shared/ui/checkbox'
import { Footer } from '@widgets/footer'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './styles.module.css'

export const MainPage = () => {
	const [isChecked, setIsChecked] = useState<CheckedState>(false)

	return (
		<>
			<main className={styles.main}>
				<Checkbox />

				{/* Тестовый блок с чекбоксом */}
				<div className={styles.label}>
					<Checkbox
						label="Согласен"
						checked={isChecked}
						onCheckedChange={setIsChecked}
					/>
				</div>
				<section className={styles.hero}>
					<div className={styles.intro}>
						<h1 className={styles.title}>Забота о своей памяти каждый день!</h1>
						<p className={styles.text}>
							Простые и увлекательные упражнения для поддержки ума, ясности
							памяти и хорошего настроения. Начните с 5 минут в день!
						</p>
					</div>

					<Button
						className={styles.cta}
						iconAfter={<ArrowRight />}
						variant={'default'}
						size={'lg'}
					>
						Начать тренировку
					</Button>
				</section>

				<Image
					src="/images/promo.jpg"
					alt="Пожилая пара с удовольствием смотрит упражнения на смартфоне"
					width={674}
					height={512}
					className={styles.promo}
					priority
				/>
			</main>
			<Footer />
		</>
	)
}
