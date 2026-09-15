export type TLinkItem = {
	label: string
	href: string
}

export type TLinkGroupProps = {
	activeLink?: string
	items: TLinkItem[]
	ariaLabel: string
	className?: string
}
