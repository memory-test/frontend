'use client'

import { useState } from 'react'
import { useRouteQueryParams } from '@shared/lib/routes'

export const QueryParamsControl: React.FC = () => {
	const { queryParams, setQueryParams } = useRouteQueryParams()
	const [value, setValue] = useState(queryParams.query ?? '')

	return (
		<div>
			<p>query: {queryParams.query ?? '—'}</p>
			<input
				type="text"
				value={value}
				onChange={(event) => setValue(event.target.value)}
				placeholder="Значение query"
			/>
			<button type="button" onClick={() => setQueryParams({ query: value || null })}>
				Установить query
			</button>
			<button
				type="button"
				onClick={() => {
					setValue('')
					setQueryParams({ query: null })
				}}
			>
				Сбросить query
			</button>
		</div>
	)
}
