import type * as RadixSlider from 'radix-ui/slider'

export type TSliderProps = React.ComponentProps<typeof RadixSlider.Root> & {
	minLabel?: string
	maxLabel?: string
}
