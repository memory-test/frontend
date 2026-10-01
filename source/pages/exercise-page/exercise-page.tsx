'use client'

import {
	type TExerciseFull,
	type TPassExercisePayload,
	type TResultExercise,
	useGetExerciseById,
	usePassExercise,
} from '@entities/exercise'
import { ExerciseChoice } from '@features/exercises/exercise-choice'
import { ExerciseInput } from '@features/exercises/exercise-input'
import { ExerciseMatching } from '@features/exercises/exercise-matching'
import { ExerciseOrdering } from '@features/exercises/exercise-ordering'
import { tokenStorage } from '@shared/api'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import type React from 'react'
import { useCallback, useState } from 'react'
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

		default:
			return <p>Заглушка</p>
	}
}

export const ExercisePage: React.FC<TExercisePageProps> = ({ exerciseId }) => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

	const {
		data: exercise,
		isPending,
		isError,
		error,
	} = useGetExerciseById(exerciseId)

	// mutateAsync - строгий тип: (payload: TPassExercisePayload) => Promise<TResultExercise>
	const { mutateAsync: passExercise } = usePassExercise(exerciseId)

	const handlePass = useCallback(
		async (payload: TPassExercisePayload): Promise<TResultExercise> => {
			if (!tokenStorage.getTokens()) {
				setIsAuthModalOpen(true)
			}

			return passExercise(payload)
		},
		[passExercise],
	)

	if (isPending) return <main>Загрузка...</main>
	if (isError || !exercise) {
		return (
			<main>
				Не удалось загрузить задание: {error?.message || 'Неизвестная ошибка'}
			</main>
		)
	}

	return (
		<main>
			{renderExercise({ ...exercise, onPass: handlePass })}

			<Modal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
				<Modal.Title>Необходимо войти в аккаунт</Modal.Title>
				<Modal.Description>
					Чтобы отправить задание на проверку и увидеть результат, войдите в
					аккаунт. Ответы этой попытки не сохранятся.
				</Modal.Description>
				<div style={{ display: 'flex', gap: '24px' }}>
					<Button href={createUrl(routerPath.auth)}>Войти</Button>
					<Modal.Close asChild>
						<Button variant="outline">Остаться гостем</Button>
					</Modal.Close>
				</div>
			</Modal>
		</main>
	)
}
