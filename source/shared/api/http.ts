import { apiClient } from './instance'
import { normalizeError } from './normalize-error'
import type { TRequestOptions } from './types'

async function request<T>(
	method: 'get' | 'post' | 'put' | 'patch' | 'delete',
	url: string,
	options?: TRequestOptions,
): Promise<T> {
	try {
		return await apiClient[method](url, options).json<T>()
	} catch (error) {
		throw normalizeError(error)
	}
}

export const http = {
	get: <T>(url: string, options?: TRequestOptions) =>
		request<T>('get', url, options),
	post: <T>(url: string, json?: unknown, options?: TRequestOptions) =>
		request<T>('post', url, { ...options, json }),
	put: <T>(url: string, json?: unknown, options?: TRequestOptions) =>
		request<T>('put', url, { ...options, json }),
	patch: <T>(url: string, json?: unknown, options?: TRequestOptions) =>
		request<T>('patch', url, { ...options, json }),
	delete: <T>(url: string, options?: TRequestOptions) =>
		request<T>('delete', url, options),
}
