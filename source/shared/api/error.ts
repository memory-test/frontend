export interface IApiErrorShape {
	status: number
	message: string
	code?: string
	details?: unknown
}

export class ApiError extends Error {
	readonly status: number
	readonly code?: string
	readonly details?: unknown

	constructor({ status, message, code, details }: IApiErrorShape) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.code = code
		this.details = details
	}
}
