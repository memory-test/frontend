import { QueryParamsControl } from '@features/query-params-control'
import { DashboardPage } from '@pages/dashboard-page'
import { createUrl, routerPath } from '@shared/lib/routes'
import Link from 'next/link'
import { Suspense } from 'react'

const HomePage: React.FC = () => {
	return (
		<div style={{ marginTop: '84px' }}>
			<DashboardPage />
			<nav>
				<ul>
					<li>
						<Link href={createUrl(routerPath.auth)}>Авторизация</Link>
					</li>
					<li>
						<Link href={createUrl(routerPath.profile)}>Профиль</Link>
					</li>
				</ul>
			</nav>
			<Suspense fallback="loading...">
				<QueryParamsControl />
			</Suspense>
		</div>
	)
}

export default HomePage
