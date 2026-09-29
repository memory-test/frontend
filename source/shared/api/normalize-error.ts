import { HTTPError, TimeoutError } from 'ky'
import type { TFieldErrors } from './error'
import { ApiError } from './error'

interface IBackendErrorBody {
	detail?: string | string[]
	message?: string
	code?: string
	details?: unknown
}

const NON_FIELD_KEYS = new Set(['detail', 'message', 'code', 'details'])

function extractFieldErrors(body: object): TFieldErrors | undefined {
	const entries = Object.entries(body).filter(
		(entry): entry is [string, string[]] =>
			!NON_FIELD_KEYS.has(entry[0]) &&
			Array.isArray(entry[1]) &&
			entry[1].every((item) => typeof item === 'string'),
	)

	return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function extractMessage(body: IBackendErrorBody, fallback: string): string {
	if (Array.isArray(body.detail)) return body.detail[0] ?? fallback
	return body.detail ?? body.message ?? fallback
}

export function normalizeError(error: unknown): ApiError {
	if (error instanceof HTTPError) {
		const body = (error.data as IBackendErrorBody | undefined) ?? {}

		return new ApiError({
			status: error.response.status,
			message: extractMessage(body, error.message),
			code: body.code,
			details: body.details,
			fieldErrors: extractFieldErrors(body),
		})
	}

	if (error instanceof TimeoutError) {
		return new ApiError({
			status: 408,
			message: 'Request timed out',
			code: 'TIMEOUT',
		})
	}

	return new ApiError({
		status: 0,
		message: error instanceof Error ? error.message : 'Network error',
		code: 'NETWORK_ERROR',
	})
}
