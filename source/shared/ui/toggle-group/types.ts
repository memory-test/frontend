import type * as ToggleRadix from 'radix-ui/toggle-group'
import type React from 'react'

type TToggleGroupSize = 'sm' | 'md' | 'lg'
type TToggleGroupVariant = 'row' | 'buttons'

export type TToggleItem = {
	value: string
	content: React.ReactNode
}

export type TToggleGroupProps = React.ComponentProps<
	typeof ToggleRadix.Root
> & {
	label?: string
	labelClassName?: string
	size?: TToggleGroupSize
	items: TToggleItem[]
	variant?: TToggleGroupVariant
}
