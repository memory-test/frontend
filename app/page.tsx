import { QueryParamsControl } from '@features/query-params-control'
import { createUrl, routerPath } from '@shared/lib/routes'
import { Button } from '@shared/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

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
			<br />
			<Button size="lg" disabled>
				Button
			</Button>
			<Button size="lg">Button</Button>
			<Button size="md">Button</Button>
			<Button size="sm">Button</Button>
			<br />
			<br />
			<Button variant="outline" size="lg" disabled>
				Button
			</Button>
			<Button variant="outline" size="lg">
				Button
			</Button>
			<Button variant="outline" size="md">
				Button
			</Button>
			<Button variant="outline" size="sm">
				Button
			</Button>{' '}
			<br />
			<br />
			<Button variant="ghost" size="lg" disabled>
				Button
			</Button>
			<Button variant="ghost" size="lg">
				Button
			</Button>
			<Button variant="ghost" size="md">
				Button
			</Button>
		</div>
	)
}

export default HomePage
