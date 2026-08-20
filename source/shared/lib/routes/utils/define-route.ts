type TJoinRoute<T extends readonly string[]> = T extends readonly [
	infer Head extends string,
	...infer Tail extends readonly string[],
]
	? Tail extends readonly []
		? Head
		: `${Head}/${TJoinRoute<Tail>}`
	: ''

export const defineRoute = <const T extends readonly string[]>(
	segments: T,
): TJoinRoute<T> => segments.join('/') as TJoinRoute<T>
