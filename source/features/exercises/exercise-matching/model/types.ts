export type TMatchingItem = {
	id: string
	text: string
}

export type TMatchingColumns = {
	first: TMatchingItem[]
	second: TMatchingItem[]
}

export type TMatchingPairs = Record<string, string>

export type TMatchingSelection = {
	id: string
	side: keyof TMatchingColumns
} | null
