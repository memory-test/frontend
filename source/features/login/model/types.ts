import type { TLoginFormValues } from './login.schema'

export type TLoginFormErrors = Partial<Record<keyof TLoginFormValues, string>>
