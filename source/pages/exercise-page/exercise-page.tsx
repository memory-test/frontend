'use client'

import type { TExerciseFull } from '@entities/exercise'
import { useGetExerciseById } from '@entities/exercise'
import { ExerciseChoice } from '@features/exercises/exercise-choice'
import { ExerciseMatching } from '@features/exercises/exercise-matching'
import type React from 'react'
import type { TExercisePageProps } from './types'

// TODO: Заменить в default заглушку на assertNever(exercise) как появятся все варианты
const renderExercise = (exercise: TExerciseFull) => {
	switch (exercise.type) {
		case 'choice':
			return <ExerciseChoice {...exercise} />
		case 'matching':
			return <ExerciseMatching {...exercise} />
		default:
			return <p>Заглушка</p>
	}
}

export const ExercisePage: React.FC<TExercisePageProps> = ({ exerciseId }) => {
	const {
		data: exercise,
		isPending,
		isError,
		error,
	} = useGetExerciseById(exerciseId)

	if (isPending) return <main>Загрузка...</main>
	if (isError) return <main>Не удалось загрузить задание: {error.message}</main>

	return <main>{renderExercise(exercise)}</main>
}
