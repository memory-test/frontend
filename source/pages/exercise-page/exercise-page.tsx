'use client'

import {
	type TExerciseFull,
	type TPassExercisePayload,
	type TResultExercise,
	useGetExerciseById,
	usePassExercise,
} from '@entities/exercise'
import { ExerciseChoice } from '@features/exercises/exercise-choice'
import { ExerciseGrouping } from '@features/exercises/exercise-grouping'
import { ExerciseInput } from '@features/exercises/exercise-input'
import { ExerciseMatching } from '@features/exercises/exercise-matching'
import { ExerciseOrdering } from '@features/exercises/exercise-ordering'
import type React from 'react'
import type { TExercisePageProps } from './types'

type TRenderExerciseProps = TExerciseFull & {
	onPass: (payload: TPassExercisePayload) => Promise<TResultExercise>
}

// TODO: Заменить в default заглушку на assertNever(exercise) как появятся все варианты
const renderExercise = ({ onPass, ...exercise }: TRenderExerciseProps) => {
	switch (exercise.type) {
		case 'choice':
			// ExerciseChoice должен ожидать onPass с answers_ids
			return <ExerciseChoice {...exercise} onPass={onPass} />
		case 'input':
			// ExerciseInput ожидает onPass с answers
			return <ExerciseInput {...exercise} onPass={onPass} />
		case 'matching':
			return <ExerciseMatching {...exercise} onPass={onPass} />
		case 'ordering':
			return <ExerciseOrdering {...exercise} onPass={onPass} />
		case 'grouping':
			return <ExerciseGrouping {...exercise} onPass={onPass} />

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

	// mutateAsync - строгий тип: (payload: TPassExercisePayload) => Promise<TResultExercise>
	const { mutateAsync: passExercise } = usePassExercise(exerciseId)

	if (isPending) return <main>Загрузка...</main>
	if (isError || !exercise) {
		return (
			<main>
				Не удалось загрузить задание: {error?.message || 'Неизвестная ошибка'}
			</main>
		)
	}

	return <main>{renderExercise({ ...exercise, onPass: passExercise })}</main>
}
