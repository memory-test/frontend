import type { LucideIcon } from 'lucide-react'

type TMaxLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type TLevelIndicatorProps = {
	maxLevel: TMaxLevel
	currentLevel: number
	icon: LucideIcon
}
