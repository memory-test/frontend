type TControlledProps = {
	value: boolean
	onChange: (value: boolean) => void
}

type TUncontrolledProps = {
	value?: never
	onChange?: (value: boolean) => void
}

export type TChangeContrastProps = TControlledProps | TUncontrolledProps
