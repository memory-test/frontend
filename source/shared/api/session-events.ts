type TListener = () => void

const listeners = new Set<TListener>()

export function onSessionExpired(callback: TListener): () => void {
	listeners.add(callback)

	return () => {
		listeners.delete(callback)
	}
}

export function notifySessionExpired(): void {
	for (const listener of listeners) {
		listener()
	}
}
