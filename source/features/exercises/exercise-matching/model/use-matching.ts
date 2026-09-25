import type { TExerciseMatchingAnswerInfo } from '@entities/exercise'
import { useState } from 'react'
import type {
	TMatchingColumns,
	TMatchingItem,
	TMatchingPairs,
	TMatchingSelection,
} from './types'

const shuffle = <T>(items: T[]): T[] => {
	const result = [...items]

	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))

		;[result[i], result[j]] = [result[j], result[i]]
	}

	return result
}

const toItems = (texts: string[], prefix: string): TMatchingItem[] =>
	shuffle(texts).map((text, index) => ({
		id: `${prefix}-${index}`,
		text,
	}))

export const useMatching = (answersInfo: TExerciseMatchingAnswerInfo[]) => {
	const [columns] = useState<TMatchingColumns>(() => ({
		first: toItems(
			answersInfo.map((answer) => answer.first_text),
			'first',
		),
		second: toItems(
			answersInfo.map((answer) => answer.second_text),
			'second',
		),
	}))

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

	return { columns, pairs, selection, selectItem, isComplete }
}
