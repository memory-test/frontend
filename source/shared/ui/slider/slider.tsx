import clsx from 'clsx'
import * as RadixSlider from 'radix-ui/slider'
import type React from 'react'
import styles from './styles.module.css'
import type { TSliderProps } from './types'

export const Slider: React.FC<TSliderProps> = ({
	minLabel,
	maxLabel,
	className,
	...props
}) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			{minLabel && <span>{minLabel}</span>}

			<RadixSlider.Root className={styles.root} {...props}>
				<RadixSlider.Track className={styles.track}>
					<RadixSlider.Range className={styles.range} />
				</RadixSlider.Track>
				<RadixSlider.Thumb className={styles.thumb} />
			</RadixSlider.Root>

			{maxLabel && <span>{maxLabel}</span>}
		</div>
	)
}
