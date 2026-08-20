import Link from 'next/link'
import { Suspense } from 'react'
import { QueryParamsControl } from '@features/query-params-control'
import { createUrl, routerPath } from '@shared/lib/routes'

const HomePage: React.FC = () => {
	return (
		<div>
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
