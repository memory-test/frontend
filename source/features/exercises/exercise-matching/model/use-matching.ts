import type {
	TExerciseMatchingAnswerInfo,
	TExerciseMatchingOption,
} from '@entities/exercise'
import { useState } from 'react'
import type {
	TMatchingColumns,
	TMatchingItem,
	TMatchingPairs,
	TMatchingSelection,
} from './types'

const toItems = (
	options: TExerciseMatchingOption[],
	side: 'left' | 'right',
): TMatchingItem[] =>
	options.map((option) => ({
		id: `${side}-${option.id}`,
		optionId: option.id,
		text: option.text,
	}))

export const useMatching = (answersInfo: TExerciseMatchingAnswerInfo) => {
	const columns: TMatchingColumns = {
		first: toItems(answersInfo.left, 'left'),
		second: toItems(answersInfo.right, 'right'),
	}

	const [pairs, setPairs] = useState<TMatchingPairs>({})
	const [selection, setSelection] = useState<TMatchingSelection>(null)

	const unpair = (id: string) => {
		setPairs((prev) =>
			Object.fromEntries(
				Object.entries(prev).filter(
					([firstId, secondId]) => firstId !== id && secondId !== id,
				),
			),
		)
	}

	const selectItem = (id: string, side: keyof TMatchingColumns) => {
		const isPaired =
			side === 'first' ? id in pairs : Object.values(pairs).includes(id)

		if (isPaired) {
			unpair(id)
			setSelection(null)

			return
		}

		if (!selection || selection.side === side) {
			setSelection({ id, side })

			return
		}

		const firstId = side === 'first' ? id : selection.id
		const secondId = side === 'second' ? id : selection.id

		setPairs((prev) => ({ ...prev, [firstId]: secondId }))
		setSelection(null)
	}

	const isComplete = Object.keys(pairs).length === columns.first.length

	const buildPairs = () =>
		Object.entries(pairs).flatMap(([firstId, secondId]) => {
			const first = columns.first.find((item) => item.id === firstId)
			const second = columns.second.find((item) => item.id === secondId)

			return first && second
				? [{ first_id: first.optionId, second_id: second.optionId }]
				: []
		})

	const resetPairs = () => {
		setPairs({})
		setSelection(null)
	}

	return {
		columns,
		pairs,
		selection,
		selectItem,
		isComplete,
		buildPairs,
		resetPairs,
	}
}
