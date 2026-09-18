export const applyHighContrast = (value: boolean) => {
	document.documentElement.toggleAttribute('data-high-contrast', value)
}
