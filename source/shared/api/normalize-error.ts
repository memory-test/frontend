import { HTTPError, TimeoutError } from 'ky'
import { ApiError } from './error'

interface IBackendErrorBody {
	message?: string
	code?: string
	details?: unknown
}

export function normalizeError(error: unknown): ApiError {
	if (error instanceof HTTPError) {
		const body = (error.data as IBackendErrorBody | undefined) ?? {}

		return new ApiError({
			status: error.response.status,
			message: body.message ?? error.message,
			code: body.code,
			details: body.details,
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
