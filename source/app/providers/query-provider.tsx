'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'
import { useState } from 'react'

export const QueryProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: 2,
					},
					mutations: {
						retry: 0,
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
