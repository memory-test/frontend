import type { Options } from 'ky'

export type TRequestOptions = Omit<Options, 'prefix' | 'baseUrl'> & {
	headers?: HeadersInit
}

export interface ITokens {
	access: string
	refresh: string
}
