'use client'

import type React from 'react'
import type { TExerciseOrderingProps } from './types'

export const ExerciseOrdering: React.FC<TExerciseOrderingProps> = ({
	id,
	title,
	description,
	question,
	answers_info,
}) => {
	return (
		<section>
			<h1>ExerciseOrdering</h1>
			<p>ID: {id}</p>
			<p>Описание: {description}</p>
			<p>Задание: {title}</p>
			<p>Вопрос: {question}</p>
			<p>Элементов: {answers_info.length}</p>
			{answers_info.map((item) => (
				<p key={item.text}>{item.text}</p>
			))}
		</section>
	)
}
