export type TFieldErrors = Record<string, string[]>

export interface IApiErrorShape {
	status: number
	message: string
	code?: string
	details?: unknown
	fieldErrors?: TFieldErrors
}

export class ApiError extends Error {
	readonly status: number
	readonly code?: string
	readonly details?: unknown
	readonly fieldErrors?: TFieldErrors

	constructor({ status, message, code, details, fieldErrors }: IApiErrorShape) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.code = code
		this.details = details
		this.fieldErrors = fieldErrors
	}
}
