type TListener = () => void

let listener: TListener | null = null

export function onSessionExpired(callback: TListener): void {
	listener = callback
}

export function notifySessionExpired(): void {
	listener?.()
}
