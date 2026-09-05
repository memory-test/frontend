import type { Options } from 'ky'

export type TRequestOptions = Omit<Options, 'prefix' | 'baseUrl'> & {
	headers?: HeadersInit
}
