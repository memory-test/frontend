import type { TFontSize } from '../model/font-size'

type TControlledProps = {
	value: TFontSize
	onChange: (value: TFontSize) => void
}

type TUncontrolledProps = {
	value?: never
	onChange?: (value: TFontSize) => void
}

export type TChangeFontSizeProps = TControlledProps | TUncontrolledProps
